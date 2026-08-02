---
layout: page
title: Blog
description: >-
  All blog posts by Pavel Khvalygin — homelab AI setup, terminal game dev,
  language benchmarks, and other experiments.
permalink: /blog/
last_modified_at: 2026-08-02
---

{% if site.posts.size > 0 %}
{% include post-list.html posts=site.posts %}
{% else %}
<p>No posts yet.</p>
{% endif %}
