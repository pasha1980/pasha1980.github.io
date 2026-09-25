---
layout: project
title: "CloudOpt"
slug: cloudopt
description: >-
  A local, read-only cloud cost optimization analyzer for AWS and GCP.
last_modified_at: 2026-09-25
permalink: /projects/cloudopt/
---

I started CloudOpt after finding the same problems during infrastructure reviews: idle resources, oversized instances, missing cost tags, and bills nobody could connect to usage.

CloudOpt collects inventory, billing data, and metrics, then runs deterministic checks and exports HTML or JSON reports. It runs locally with read-only cloud access and leaves resources unchanged. The alpha has missing checks, rough edges, and enough command-line interaction to discourage anyone outside infrastructure engineering.

I plan to use CloudOpt as one component in a broader cloud management platform. You can [try the offline demo](https://cloudopt.kernul.io), inspect the [source code](https://github.com/kernul-io/cloudopt), or test it against AWS or GCP.
