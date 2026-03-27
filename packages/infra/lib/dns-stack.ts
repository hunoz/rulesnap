import { Stack, StackProps } from "aws-cdk-lib";
import { HostedZone, IHostedZone } from "aws-cdk-lib/aws-route53";
import { Construct } from "constructs";

type DnsStackProps = StackProps & {
    zoneId: string;
}

export class DnsStack extends Stack {
    public readonly zone: IHostedZone;
    constructor(scope: Construct, id: string, props: DnsStackProps) {
        super(scope, id, props);

        this.zone = HostedZone.fromHostedZoneId(this, 'HostedZone', props.zoneId);
    }
}