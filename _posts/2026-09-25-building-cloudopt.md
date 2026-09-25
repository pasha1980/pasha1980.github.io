---
layout: post
title: "Building CloudOpt: deterministic cloud cost optimization"
date: 2026-09-25
tags:
  - cloudopt
---

At [Kernul](https://kernul.io), I review cloud infrastructure for startups and small engineering teams. Each cost review gave me the same routine: collect inventory, open billing data, compare it with metrics, and ask why an instance with no load needs so much capacity.

Some teams need that spare capacity. In other cases, the engineer who knew the reason left the company two years ago. The instance stayed.

I turned the repeatable part of this work into [CloudOpt](https://cloudopt.kernul.io), a local, read-only cloud optimization analyzer for AWS and GCP.

## what it does

CloudOpt has a four-step workflow. Please contain your excitement:

```shell
cloudopt init
cloudopt collect
cloudopt analyze
cloudopt report
```

CloudOpt stores inventory, billing data, and utilization metrics in a local workspace. It checks that evidence for waste, rightsizing opportunities, idle resources, and missing cost attribution, then exports an HTML or JSON report.

I gave CloudOpt read-only access because I do not want a cost tool to terminate an instance after a quiet Tuesday. CloudOpt gathers evidence and explains each finding. An engineer decides whether a change is safe.

CloudOpt keeps the data on your machine unless you export it. You need least-privilege credentials and a protected workspace. Local storage keeps the trust boundary small enough to inspect.

## yes, it is a CLI

CloudOpt serves infrastructure specialists. It runs in a terminal, asks for cloud credentials, and talks about billing exports and utilization metrics. My mother will not use it to reduce her AWS bill. She has no AWS bill, which remains her best cost optimization strategy.

DevOps engineers, platform engineers, FinOps practitioners, and consultants can run a scan, inspect the evidence, or feed the JSON output into another workflow.

I plan to use CloudOpt as one component in a broader cloud management platform: a cost optimization service with clear input and predictable output. The full platform does not exist yet. The CLI gives infrastructure specialists a useful tool today and gives me real workflows to study.

## why only alpha

I published the first alpha. It has gaps in provider coverage, checks, output, and documentation.

Cloud providers add services, rename fields, change APIs, and invent billing formats because one format would make life too relaxing. Supporting AWS and GCP requires ongoing research into which signals produce useful findings.

I can write a check in an afternoon. Proving that it works across real environments takes longer. Low CPU usage may identify an oversized instance, a monthly job, warm incident capacity, or software with a license tied to one machine. A metric cannot reveal those business constraints.

I spend the extra time on evidence, edge cases, and false positives. A small set of visible rules gives users more value than a large recommendation engine full of confident guesses.

## deterministic findings

I treat determinism as the main design requirement.

Two runs against the same snapshot and rule version should produce the same finding. Each finding should name the inventory, billing data, metrics, thresholds, and calculation behind it. I do not want a hidden model deciding that an instance “feels expensive.”

The reviewer should see how CloudOpt reached a finding without rerunning the arithmetic by hand. Engineers review the operational context and decide whether the recommendation fits the workload.

A deterministic check can contain a bug or use the wrong threshold for one environment. Reproducible output lets us write a test, discuss the evidence, and fix the rule. Opaque output leaves us guessing.

## what happens next

I build CloudOpt alongside infrastructure work. When I see a problem repeat across environments, I consider it for a new check. One strange customer setup does not justify a universal rule.

CloudOpt now needs tests against different AWS accounts and GCP projects. I want to know whether a finding matches the resource's role, whether the report shows enough evidence, and where setup fails.

You can run the offline demo at [cloudopt.kernul.io](https://cloudopt.kernul.io) without cloud credentials. The [source code is on GitHub](https://github.com/kernul-io/cloudopt). Testing, issue reports, documentation fixes, and code are all useful contributions.

CloudOpt remains rough and narrow. During the alpha, I am concentrating on understandable, reproducible results before I add more checks or build another interface.
