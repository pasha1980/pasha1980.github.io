---
layout: default
description: >-
  Personal site of Pavel Khvalygin — software engineer building homelab AI,
  terminal games, and language benchmarks for fun.
last_modified_at: 2026-08-02
---
<section class="panel">
  <div class="panel-header">Welcome</div>
  <div class="panel-body">
    <p class="hero-title">Tech. Just for fun.</p>
    <p class="hero-intro">I'm Pasha, a software engineer who builds things to see if they work. This site holds my projects and write-ups.</p>
  </div>
</section>

<section class="panel">
  <div class="panel-header">Projects</div>
  <div class="panel-body">
    {% include project-list.html %}
  </div>
</section>

<section class="panel">
  <div class="panel-header">Recent posts</div>
  <div class="panel-body">
    {% assign recent_posts = site.posts | slice: 0, 5 %}
    {% if recent_posts.size > 0 %}
      {% include post-list.html posts=recent_posts %}
      <p style="margin-top: 12px; font-size: 12px;"><a href="{{ '/blog/' | relative_url }}">View all posts &rarr;</a></p>
    {% else %}
      <p>No posts yet.</p>
    {% endif %}
  </div>
</section>
