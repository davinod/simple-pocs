import boto3
from botocore.exceptions import ClientError
import json
import sys


print ("loading function...")
# Create an S3 client
s3 = boto3.client('s3')

#def add_new_bucket_policy():

#def update_bucket_policy():

def lambda_handler(event, context):

    if event.get('AddStatement','None') == 'None' or event.get('AddPolicy','None') == 'None':
        print ("Please inform AddStatement and AddPolicy containing the policies you want to reinforce in your s3 buckets")
        return {
            'statusCode': 400,
            'body': 'bad request submitted. Please ensure you inform AddStatement and AddPolicy'
            }

    stringstatement = json.dumps(event["AddStatement"])
    stringpolicy = json.dumps(event["AddPolicy"])

    # Call S3 to list current buckets
    response = s3.list_buckets()

    # Get a list of all bucket names from the response
    buckets = [bucket['Name'] for bucket in response['Buckets']]

    # Print out the bucket list
    #print("Bucket List: %s" % buckets)

    for bucketname in buckets:
        try:

            print ("getting bucket policy for " + bucketname)

            # Adjust the bucketname within the new policy (it needs to explicitly contain the bucket namne)
            newstatement = json.loads(stringstatement.replace('$bucketname',bucketname))
            newpolicy = json.loads(stringpolicy.replace('$bucketname',bucketname))

            # Obtain the existing bucket policy (If there is no policy, an error will be thrown)
            response = s3.get_bucket_policy(Bucket=bucketname)

            # At this point, the bucket does have a policy, so we need to check if this policy already implements the new statemetn
            policy = json.loads(response['Policy'])
            bucketok = False

            # Check all statements to see if the new statement is already in place (to prevent duplicates)
            for statement in policy['Statement']:
                # First checks if original statement contains sid (as it is not mandatory)
                if statement.get('Sid','None') != 'None':
                    # set bucketOk to true, so it does not need to add the new statement
                    if statement['Sid'] == newstatement['Sid']:
                        bucketok = True
                        print("Bucket " + bucketname + " already contains the new statement")

            if not bucketok:
                print ("Adding new bucket policy for " + bucketname)

                # Set the new statement into the existing policy
                policy['Statement'].append(newstatement)

                # Call the API to replace the existing bucket policy
                response = s3.put_bucket_policy(Bucket=bucketname, Policy=json.dumps(policy), ConfirmRemoveSelfBucketAccess=False)

                print (response)

            #print ("Bucket " + bucketname + " - policy: " + json.dumps(policy))
            #print ("test:" + json.dumps(policy['Statement']))


            #print ("new policy is: " + json.dumps(policy['Statement']))

        except ClientError as ex:
            if str(ex).find("NoSuchBucketPolicy"):
                print ("bucket " + bucketname + " has no policy")
                print ("adding new policy")

                # Call the API to replace the existing bucket policy
                response = s3.put_bucket_policy(Bucket=bucketname, Policy=json.dumps(newpolicy), ConfirmRemoveSelfBucketAccess=False)

                print (response)

        except:
            print("Unexpected error:", sys.exc_info()[0])
            raise

    print("All buckets have been reinforced with the new policies successfully")

    return {
        'statusCode': 200,
        'body': json.dumps('All buckets have been reinforced with the new policies successfully')
    }
