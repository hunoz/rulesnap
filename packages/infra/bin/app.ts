#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { SpaStack } from '../lib/spa-stack';
import { DnsStack } from '../lib/dns-stack';

const app = new cdk.App();

const zoneId = process.env.ZONE_ID;
const domainName = process.env.DOMAIN_NAME;
const account = process.env.AWS_ACCOUNT;
const region = process.env.AWS_REGION;

if (!zoneId) {
    throw new Error('ZONE_ID environment variable is required');
}

if (!domainName) {
    throw new Error('DOMAIN_NAME environment variable is required');
}

if (!account) {
    throw new Error('AWS_ACCOUNT environment variable is required');
}

if (!region) {
    throw new Error('AWS_REGION environment variable is required');
}

const env = {
    account,
    region,
}

const dnsStack = new DnsStack(app, 'DnsStack', {
    env,
    zoneId: zoneId,
})

new SpaStack(app, 'SpaStack', {
    env,
    domainName,
    hostedZone: dnsStack.zone,
});
