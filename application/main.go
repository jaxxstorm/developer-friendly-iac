package main

import (
	"github.com/pulumi/pulumi/sdk/v2/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {

		_, err := NewAppDeployment(ctx, "app", &AppDeploymentArgs{
			Directory: "app",
		})

		if err != nil {
			return err
		}

		return nil
	})
}
