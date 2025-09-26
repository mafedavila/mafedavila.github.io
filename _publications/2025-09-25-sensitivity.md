---
title: 'Measuring LLM Sensitivity in Transformer-based Tabular Data Synthesis'
collection: publications
category: manuscripts
permalink: /publication/2025-09-25-sensitivity
excerpt: 'This study presents a sensitivity assessment on how the choice of hyperparameters, such as number of layers or hidden dimension affects the quality of the resultant synthetic data and the computational performance. It is performed across two tools, GReaT and REaLTabFormer, evaluating 10 model setups that vary in architecture type and depth. We assess the sensitivity on three dimensions: runtime, machine learning (ML) utility, and similarity to real data distributions. Experiments were conducted on four real-world datasets. Our findings reveal that runtime is proportional to the number of hyperparameters, with shallower configurations completing faster. GReaT consistently achieves lower runtimes than REaLTabFormer, and only on the largest dataset they have comparable runtime. For small datasets, both tools achieve synthetic data with high utility and optimal similarity, but on larger datasets only REaLTabFormer sustains strong utility and similarity. As a result, REaLTabFormer with lightweight LLMs provides the best balance, since it preserves data quality while reducing computational requirements. Nonetheless, its runtime remains higher than that of GReaT and other TDS tools, suggesting that efficiency gains are possible but only up to a certain level.'
date: 2025-09-25
venue: 'ArXiV'
slidesurl: #‘http://academicpages.github.io/files/slides2.pdf’
paperurl: 'https://arxiv.org/abs/2509.20768'
citation: 'Davila R., M. F., Turaev, A., & Wingerath, W. (2025). Measuring LLM sensitivity in transformer-based tabular data synthesis. arXiv preprint arXiv:2509.20768. https://doi.org/10.48550/arXiv.2509.20768'
---