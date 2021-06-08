import * as pulumi from "@pulumi/pulumi";
import * as awsx from "@pulumi/awsx";

const stack = pulumi.getStack()

const clusterTag = `kubernetes.io/cluster/lbriggs-eks-${stack}`

// this defines a valid VPC that can be used for EKS
const vpc = new awsx.ec2.Vpc(`lbriggs-vpc-${stack}`, {
    cidrBlock: "172.16.0.0/24",
    subnets: [
        {type: "private", tags: {[clusterTag]: "owned", "kubernetes.io/role/internal-elb": "1"}},
        {type: "public", tags: {[clusterTag]: "owned", "kubernetes.io/role/elb": "1"}}
    ],
    tags: {
        Name: `${stack}-vpc`,
    }
});

export const vpcId = vpc.id
export const privateSubnets = vpc.privateSubnetIds
export const publicSubnets = vpc.publicSubnetIds
