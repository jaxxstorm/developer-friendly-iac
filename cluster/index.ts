import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as eks from "@pulumi/eks";

const stack = pulumi.getStack()
const stackRef = new pulumi.StackReference(`jaxxstorm/iac-vpc/${stack}`)

const vpc = stackRef.getOutput("vpcId")
const privateSubnets = stackRef.getOutput("privateSubnets")
const publicSubnets = stackRef.getOutput("publicSubnets")

const kubeconfigOpts: eks.KubeconfigOptions = {profileName: "personal"};
const cluster = new eks.Cluster(`eks-${stack}`, {
    providerCredentialOpts: kubeconfigOpts,
    name: `lbrlabs-eks-${stack}`,
    vpcId: vpc,
    privateSubnetIds: privateSubnets,
    publicSubnetIds: publicSubnets,
    instanceType: "t2.medium",
    desiredCapacity: 2,
    minSize: 1,
    maxSize: 2,
    createOidcProvider: true,
});

export const clusterName = cluster.eksCluster.name
export const kubeconfig = cluster.kubeconfig
export const clusterOidcProvider = cluster.core.oidcProvider?.url
export const clusterOidcProviderArn = cluster.core.oidcProvider?.arn
