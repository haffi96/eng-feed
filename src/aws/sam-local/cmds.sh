# Lambda invoke print json body
sam local invoke -t cdk.out/test-stack.template.json NotifyUsers --skip-pull-image --docker-network lambda-local | tail -1 | jq '.body' | jq -r 'fromjson | .'


# Lambda invoke print logs
sam local invoke -t cdk.out/test-stack.template.json SendEmail --skip-pull-image --docker-network lambda-local 2>&1 | tr "\r" "\n"