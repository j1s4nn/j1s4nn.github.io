/* =========================================================
   Md Jisan Hossen — Bilingual (EN / 中文) toggle
   - Keys are declared with data-i18n / data-i18n-alt /
     data-i18n-aria in index.html.
   - The original English innerHTML of every keyed element is
     captured on load, so switching back to English is exact.
   - Proper nouns (name, NUIST, tool names, DOIs, paper titles,
     metric values) are intentionally kept in English inside the
     Chinese strings.
   - A missing key never throws: the element simply keeps English.
   ========================================================= */
(function () {
  "use strict";

  var STORE_KEY = "mjh-lang";

  var DICT = {
    /* ---- Navigation ---- */
    "nav.about": "关于",
    "nav.highlights": "亮点",
    "nav.research": "研究",
    "nav.projects": "项目",
    "nav.education": "教育",
    "nav.skills": "技能",
    "nav.contact": "联系",

    /* ---- Hero ---- */
    "hero.photoAlt": "Md Jisan Hossen 的肖像照",
    "hero.eyebrow": "人工智能本科生研究员 · NUIST，中国",
    "hero.role": "多模态 AI · 生成式世界模型 · LLM/NLP · 计算机视觉",
    "hero.affil": "南京信息工程大学（NUIST），中国",
    "hero.grad": "人工智能专业 理学学士 · 预计 2027 年 7 月毕业",
    "hero.focus1": "机器人科学与工程",
    "hero.focus2": "面向具身智能的机器视觉",
    "hero.btnEmail": "✉ 邮箱",

    /* ---- Section titles ---- */
    "sec.about": "关于",
    "sec.highlights": "亮点",
    "sec.interests": "研究方向",
    "sec.research": "论文与研究项目",
    "sec.projects": "项目",
    "sec.education": "教育背景",
    "sec.skills": "技能",
    "sec.contact": "联系方式",
    "stats.aria": "一览",

    /* ---- About ---- */
    "about.p1": "我是中国<strong>南京信息工程大学（NUIST）</strong>的<strong>人工智能本科生</strong>，在这里设计、训练并严格评估深度学习系统。我的研究兴趣涵盖<strong>多模态 AI</strong>、<strong>生成式世界模型</strong>、大语言模型、计算机视觉以及可复现的机器学习研究。",
    "about.p2": "我的工作处于<strong>研究工程</strong>与<strong>应用 AI</strong> 的交叉点：我构建可复现的实验、公平的评估协议与定量分析，并把成果交付为他人真正可运行的工具。我的日常工作基于 PyTorch —— 设计并微调架构（CNN、Transformer、LSTM），使用 LangChain 与 FAISS 搭建检索增强生成（RAG）与智能体流水线，并编写决定模型是否真正有效的评估代码。",
    "about.p3": "我的研究已<span class=\"hl\">发表</span>：关于因果视频生成中自适应时间粒度的第一作者预印本已在 <strong>Zenodo</strong> 发布（<a href=\"https://doi.org/10.5281/zenodo.23395414\" target=\"_blank\" rel=\"noopener\">DOI 10.5281/zenodo.23395414</a> 与 <a href=\"https://doi.org/10.5281/zenodo.23693517\" target=\"_blank\" rel=\"noopener\">DOI 10.5281/zenodo.23693517</a>），并附带<strong>完整的复现工件</strong>。该研究审计了自适应时间粒度对因果视频生成器<em>何时</em>才真正有价值，并在两款计算特性不同的 GPU 上进行了评估。",
    "about.p4": "我正在积极寻找<strong>AI/ML 研究实习</strong>机会，以及多模态 AI、世界模型、机器人、机器视觉与计算机视觉方向<strong>研究生（硕士）</strong>深造的机会。",

    /* ---- Stats ---- */
    "stat.preprints": "第一作者预印本",
    "stat.gpus": "硬件审计 · T4 + A100",
    "stat.auroc": "最佳内在探针 AUROC",
    "stat.accuracy": "基准最高准确率",

    /* ---- Highlights ---- */
    "hl1.title": "两篇第一作者预印本 · Zenodo DOI",
    "hl1.p": "撰写了关于因果视频世界模型自适应时间粒度的 <em>Jev-Routed</em> 与 <em>JevGAG + DDAG</em> 研究，两者均发表于 Zenodo，并附带完整、可复现的复现工件。",
    "hl2.title": "双 GPU、证据优先的审计",
    "hl2.p": "在 <strong>Tesla T4</strong> 与 <strong>A100-SXM4-80GB</strong> 上测量自适应时间粒度；当手工设计的基线失效（0.491）时，内在预填充探针达到 <span class=\"hl\">AUROC 0.798</span>。",
    "hl3.title": "完整交付的研究包",
    "hl3.p": "项目交付包含<strong>自动化图表生成</strong>、<strong>测试套件</strong>、<strong>持续集成</strong>以及完整的技术写作。",
    "hl4.title": "受控对比研究",
    "hl4.p": "严格匹配的 <strong>7 模型</strong>面部表情基准，以及一项在留出样本上达到 <span class=\"hl\">99.7–100% 准确率</span>的 Z 变换系统辨识研究。",

    /* ---- Research interests ---- */
    "int.robotics.title": "机器人科学与工程",
    "int.robotics.p": "自主且具韧性的机器人系统、基于学习的控制、多智能体自主性，以及让具身智能体在真实世界中可靠运行的工程方法。",
    "int.vision.title": "面向具身智能的机器视觉",
    "int.vision.p": "闭合感知—行动回路的视觉：空间理解、视觉里程计与世界模型诊断，以及让智能体得以行动的表示。",
    "int.mm.title": "多模态 AI",
    "int.mm.p": "视觉—语言模型、多模态表示学习，以及面向生成式视频世界模型的自适应计算。",
    "int.llm.title": "LLM / NLP",
    "int.llm.p": "语言模型、检索增强生成（RAG）、自主智能体与语义理解。",
    "int.cv.title": "计算机视觉",
    "int.cv.p": "图像与视频理解、识别系统与医学影像。",
    "int.dl.title": "深度学习",
    "int.dl.p": "模型设计、受控的架构对比与可复现评估。",

    /* ---- Publications ---- */
    "res.note": "<strong>两篇第一作者预印本</strong>（Zenodo，DOI），附完整复现工件。同行评审论文：暂无。以下研究级项目均为自主研究，其中若干正在撰写为论文手稿。",

    "pub.jevgag.meta": "<span class=\"badge-new\">最新</span> 2026 · 预印本（Zenodo）",
    "pub.jevgag.d1": "<span class=\"entry-label\">预印本 — DOI 10.5281/zenodo.23693517。</span>一项关于因果视频生成与交互式视频世界模型中<strong>自适应时间粒度</strong>的两部分研究计划：<em>第 1 部分 — JevGAG</em>（报告）审计生成器何时应投入精细的逐帧计算、何时使用更廉价的分块模式即可；<em>第 2 部分 — DDAG</em>（方法）将这些发现转化为可部署的、感知工作区（regime-aware）的规则。",
    "pub.jevgag.d2": "<span class=\"entry-label\">发现：</span>在一项针对因果扩散骨干网络、在匹配的 <strong>Tesla T4</strong> 与 <strong>A100-80GB</strong> 上的研究中，同一模式对位于成本盈亏平衡的<span class=\"hl\">两侧</span>；手工设计的上下文统计无法预测“粗粒度不安全”的片段（AUROC <span class=\"hl\">0.491</span>），而生成器自身预填充激活上的<span class=\"hl\">内在探针</span>达到 <span class=\"hl\">AUROC 0.798</span> —— 但在另一块 GPU 上却<em>反转</em>为 <span class=\"hl\">0.143</span>；只有对探针与采样器收敛残差使用<span class=\"hl\">多特征</span>模型才能在两者间迁移（<span class=\"hl\">0.842</span> / <span class=\"hl\">0.833</span>）。一种<span class=\"hl\">免训练的 25% 潜空间混合</span>将切换边界接缝削减 <span class=\"hl\">25%</span> 并提升保真度；<span class=\"hl\">工作区图</span>表明只有当廉价模式<em>更便宜且更差</em>时自适应才划算 —— 该计划诚实的结论是廉价模式<span class=\"hl\">从不更差</span>，因此最优策略是<em>固定</em>模式，只有在精确界定的区域内才值得部署路由器。",

    "pub.jevrouted.meta": "2026 · 预印本（Zenodo）",
    "pub.jevrouted.d1": "<span class=\"entry-label\">预印本 — DOI 10.5281/zenodo.23395414。</span>因果视频生成器一次生成一个时间块的 rollout，这促使人只在片段困难处投入精细的逐帧计算。实现这一想法需要三个通常被假设而非被测量的前提：在部署硬件上确实更廉价的模式、能在生成前预测困难片段的信号，以及能独立验证这一权衡的终点指标。",
    "pub.jevrouted.d2": "<span class=\"entry-label\">方法：</span>在 <strong>Causal-rCM</strong>（Wan2.1-T2V-1.3B-480p 因果文生视频扩散模型）上端到端审计这三个前提，按片段在逐帧模式（<code>c1-1</code>）、三帧块模式（<code>c3-3</code>）以及近乎零成本的 <strong>hold</strong> 模式之间路由，并采用带滞后（hysteresis）与强制恢复的双阈值控制器。路由由纯文本的 <strong>Jev</strong> System One 预言机驱动，它在片段生成前回答分类型的难度、漂移风险与运动类别问题。审计在 <strong>16 GB Tesla T4</strong> 与 <strong>A100-SXM4-80GB</strong> 上运行。",
    "pub.jevrouted.d3": "<span class=\"entry-label\">发现：</span>成本是<strong>硬件相关的</strong> —— 在 T4 上，粗粒度前向是精细前向的 <span class=\"hl\">3.01×</span>，高于 <span class=\"hl\">2.33×</span> 的盈亏平衡（因此粗粒度从不更便宜）；但在 A100 上该比值降至 <span class=\"hl\">1.60–1.75</span>，粗粒度在 DiT 时间上快 <span class=\"hl\">1.46×</span>；预先注册的手工信号失效（AUROC 0.491），而纯文本 Jev 预言机达到 <span class=\"hl\">AUROC 0.788 [0.575, 0.946]</span>，每次决策 <span class=\"hl\">0.67 s</span>；滞后与恢复减少了切换次数（T4 上 <span class=\"hl\">0.50→0.38</span>；A100 注入噪声下 <span class=\"hl\">0.92→0.50</span>）且不增加后悔值；在 24 条全新 A100 提示上，单次决策的 Jev 策略节省 <span class=\"hl\">1.78 s</span> 的 DiT 时间与 <span class=\"hl\">7.39 s</span> 的总时间，代价是 <span class=\"hl\">−0.020</span> 的 CLIP 主体一致性 —— 这是一种权衡，而非全面占优。",

    "art.title": "<a href=\"https://github.com/j1s4nn/jev-adaptive-granularity-WM\" target=\"_blank\" rel=\"noopener\">jev-adaptive-granularity-WM — 复现工件</a>",
    "art.meta": "2026 · 研究工件",
    "art.d1": "<span class=\"entry-label\">工件：</span>支撑 <em>Jev-Routed</em> 预印本的官方代码、锁定协议、校准冻结与审计工件 —— 用于 causal-rCM 推理、控制器、不确定性与评估的 <code>src/</code> 包；<strong>50</strong> 个审计、校准与图表生成脚本；<strong>34</strong> 个可复现实验任务定义（阶段 0–5c 以及 RQ3/RQ4）；以及每个阶段的 JSON/JSONL/CSV 结果。该研究刻意<strong>保留证据</strong>：负面与失败的实验均作为证据报告。",

    "wm.title": "<a href=\"https://github.com/j1s4nn/wmdrift\" target=\"_blank\" rel=\"noopener\">wmdrift — 视频世界模型诊断</a>",
    "wm.meta": "2026 · 研究工具",
    "wm.d1": "<span class=\"entry-label\">问题：</span>自回归视频世界模型的长时程失效 —— 相机漂移、时间抖动、空间记忆衰减、质量退化 —— 通常只有定性描述而无定量测量，导致不同运行无法比较。",
    "wm.d2": "<span class=\"entry-label\">方法：</span>仅推理的指标，结合 <strong>ORB 视觉里程计</strong>与 Umeyama Sim(3) 对齐、去趋势光流谱分析、回环 LPIPS，以及可选 CLIP 对齐的拉普拉斯方差质量趋势。在合成夹具上与已知真值位姿验证；<strong>24 项测试套件</strong>；可在 CPU 上运行。",

    "aria.title": "<a href=\"https://github.com/j1s4nn/ARIA-Adaptive-Resilient-Intelligent-Autopilot-For-Drone\" target=\"_blank\" rel=\"noopener\">ARIA — 韧性 LLM 控制的无人机自动驾驶</a>",
    "aria.meta": "2026 · 多智能体系统",
    "aria.d1": "<span class=\"entry-label\">问题：</span>自主无人机必须能在执行器故障下存活、接受自然语言指令、遵守社会约束并管理能量 —— 这些通常被孤立地解决。",
    "aria.d2": "<span class=\"entry-label\">方法：</span>围绕共享的 6 自由度四旋翼模型的<strong>四个协作智能体</strong> —— 自愈控制（PPO）、LLM 飞行员（经 llama.cpp 的 Mistral-7B）、伦理护栏（CLIP），以及提前 60 s 预测能量与风的数字孪生（卡尔曼滤波）。一条命令即可重新生成所有图表、遥测日志与报告；<strong>19 项单元测试</strong>；GitHub Actions 上的 CI。",

    "fer.title": "<a href=\"https://github.com/j1s4nn/FER_2026\" target=\"_blank\" rel=\"noopener\">FER_2026 — 面部表情识别：一项受控的 7 模型研究</a>",
    "fer.meta": "2026 · 对比研究",
    "fer.d1": "<span class=\"entry-label\">问题：</span>在评估协议不固定的情况下，深度架构相比经典基线究竟带来多少提升，尚不明确。",
    "fer.d2": "<span class=\"entry-label\">方法：</span>采用<strong>完全相同的协议</strong> —— 相同的平衡 CK+ 语料库（2,450 张图像）、相同的分层划分、相同的训练循环 —— 对比 KNN、SVM、从零训练的 CNN、VGG16、MobileNetV2、ResNet50 与 EfficientNetB0。目前结果：<span class=\"hl\">ResNet50 100%</span>、自建 CNN <span class=\"hl\">96.3%</span>、EfficientNetB0 93.9%、SVM 73.1%、KNN 49.8% 测试准确率。",

    "dip.title": "<a href=\"https://github.com/j1s4nn/DIP-ZTransform-DeepLearning-SystemID\" target=\"_blank\" rel=\"noopener\">基于深度学习的 LTI 系统辨识（Z 变换）</a>",
    "dip.meta": "2025 · 课程研究（DIP）",
    "dip.d1": "<span class=\"entry-label\">问题：</span>能否将离散时间滤波器辨识转化为在 Z 变换零极点几何上的学习，从而连接经典数字信号处理与深度学习？",
    "dip.d2": "<span class=\"entry-label\">方法：</span>将零极点图渲染为 64×64 图像，并与 128 维频率响应向量配对，在 5 类滤波器分类上比较 PoleZeroCNN、FreqMLP 与后期融合的 FusionNet —— 在 750 个留出样本上达到 <span class=\"hl\">99.7–100% 准确率</span>，并附完整的 <strong>1,257 行 LaTeX 论文</strong>与 <strong>19 张自动生成图表</strong>。",

    /* ---- Projects ---- */
    "proj.duomind.title": "<a href=\"https://github.com/j1s4nn/duomind\" target=\"_blank\" rel=\"noopener\">duomind — Jev + 小型本地 LLM（系统 1 / 系统 2）</a>",
    "proj.duomind.meta": "LLM 系统",
    "proj.duomind.d": "将小型本地 LLM（系统 2）与 <strong>Jev</strong> 模型（系统 1）配对，使小模型<strong>更快、更准确</strong> —— 兼容 OpenAI、私有，并可在 Kilo Code 与 Cline 内低成本本地运行。项目页面位于 <a href=\"https://j1s4nn.github.io/duomind\" target=\"_blank\" rel=\"noopener\">j1s4nn.github.io/duomind</a>。",

    "proj.jevxagent.title": "<a href=\"https://github.com/j1s4nn/jevXagent\" target=\"_blank\" rel=\"noopener\">jevXagent — AI 编程智能体的透明代理</a>",
    "proj.jevxagent.meta": "开发者工具",
    "proj.jevxagent.d": "一个透明代理，通过路由 AI 编程智能体流量来降低延迟与 token 成本。该仓库报告称，借助其称为 <strong>Line J 架构</strong>的路由层，响应时间从 2.4 s 降至 <span class=\"hl\">890 ms</span>（约<span class=\"hl\">快 3×</span>、<span class=\"hl\">便宜约 80%</span>），可与 Kilo Code、Cline 与 Claude Code 配合使用。",

    "proj.aiagent.title": "<a href=\"https://github.com/j1s4nn/AI_Agent\" target=\"_blank\" rel=\"noopener\">AI_Agent — 自主研究智能体（ReAct + RAG）</a>",
    "proj.aiagent.meta": "LLM 智能体",
    "proj.aiagent.d": "一个 LangChain <strong>ReAct</strong> 智能体（gpt-4o-mini），在上传文档的 FAISS <strong>RAG</strong>（MiniLM 嵌入）与实时网络搜索之间路由，具备多轮记忆与完全公开的推理轨迹，并通过 FastAPI 与 Streamlit 提供服务。",

    "proj.dupiq.title": "<a href=\"https://github.com/j1s4nn/duplicate-question-pairs\" target=\"_blank\" rel=\"noopener\">DuplicateIQ — 语义重复问题检测</a>",
    "proj.dupiq.meta": "NLP 服务",
    "proj.dupiq.d": "一个自托管服务，<strong>依据语义而非字面匹配</strong>检测重复问题：通过 FastAPI 背后的 FAISS 余弦索引检索 Sentence-BERT（all-MiniLM-L6-v2）嵌入，采用精度优先的阈值与自动 TF-IDF 回退。",

    "proj.tcga.title": "<a href=\"https://github.com/j1s4nn/TCGA-BRCA-Medical-AI-Analysis-MRI-Based-Breast-Cancer-Subtype-Prediction\" target=\"_blank\" rel=\"noopener\">TCGA-BRCA 医学 AI — 基于 MRI 的乳腺癌亚型预测</a>",
    "proj.tcga.meta": "医学影像",
    "proj.tcga.d": "基于 <strong>DCE-MRI</strong> 的深度学习分析，用于乳腺癌亚型预测，围绕 TCGA-BRCA 队列构建，并配有可复现的预处理与评估流水线。",

    "proj.atmo.title": "<a href=\"https://github.com/j1s4nn/atmosense-climate-ai\" target=\"_blank\" rel=\"noopener\">atmosense-climate-ai — LSTM 气候预测</a>",
    "proj.atmo.meta": "时间序列",
    "proj.atmo.d": "基于 <strong>ERA5</strong> 再分析数据的 LSTM 预测，配有可复现的数据流水线与预测技巧的定量评估。",

    "proj.elev.title": "<a href=\"https://github.com/j1s4nn/Smart_Elevator_Vision_Aided_Dispatch_system\" target=\"_blank\" rel=\"noopener\">Smart Elevator — 视觉辅助调度系统</a>",
    "proj.elev.meta": "计算机视觉",
    "proj.elev.d": "一个 <strong>YOLOv5</strong> 视觉辅助电梯调度系统，利用目标检测为调度决策提供依据。",

    "proj.conv.title": "<a href=\"https://github.com/j1s4nn/Converge\" target=\"_blank\" rel=\"noopener\">Converge — AI 媒体工具链</a>",
    "proj.conv.meta": "应用 AI",
    "proj.conv.d": "一个 AI 媒体工具链，在统一界面后集成 <strong>Real-ESRGAN</strong> 超分辨率与 <strong>Demucs</strong> 音源分离。",

    /* ---- Education ---- */
    "edu.degree": "人工智能专业 理学学士",
    "edu.school": "南京信息工程大学（NUIST）— 中国 南京",
    "edu.date": "预计 2027 年 7 月",
    "edu.li1": "关于因果视频生成中自适应时间粒度的<strong>两篇第一作者预印本</strong>，已在 Zenodo 发布并附完整复现工件（<a href=\"https://doi.org/10.5281/zenodo.23395414\" target=\"_blank\" rel=\"noopener\">DOI 10.5281/zenodo.23395414</a>；<a href=\"https://doi.org/10.5281/zenodo.23693517\" target=\"_blank\" rel=\"noopener\">DOI 10.5281/zenodo.23693517</a>）。",
    "edu.li2": "课程作业以<strong>完整研究包</strong>形式交付 —— 例如深度学习系统辨识（数字图像处理），包含完整 LaTeX 论文、可复现流水线与 19 张自动生成图表。",
    "edu.li3": "独立研究工程涵盖<strong>视频世界模型诊断</strong>（wmdrift）、<strong>多智能体自主性</strong>（ARIA）与<strong>受控视觉研究</strong>（FER_2026）。",

    /* ---- Skills ---- */
    "skill.prog.cat": "编程",
    "skill.prog.list": "Python · Java · SQL",
    "skill.dl.cat": "深度学习",
    "skill.dl.list": "PyTorch · TensorFlow · Keras · 扩散模型 · 视频生成",
    "skill.ml.cat": "机器学习",
    "skill.ml.list": "scikit-learn · NumPy · Pandas",
    "skill.cv.cat": "计算机视觉",
    "skill.cv.list": "OpenCV · CNN · 图像处理",
    "skill.rob.cat": "机器人 / 具身智能",
    "skill.rob.list": "机器人自主性 · 基于学习的控制 · 视觉里程计 · 世界模型诊断",
    "skill.llm.cat": "LLM / NLP",
    "skill.llm.list": "Transformer · 嵌入 · RAG · 智能体（LangChain、FAISS、Sentence-BERT）",
    "skill.tools.cat": "工具",
    "skill.tools.list": "Git · Linux · Docker · Jupyter · Zotero",
    "skill.aitools.cat": "AI 工具",
    "skill.aitools.list": "ClaudeCode · KiloCode · Cline · OpenCode",

    /* ---- Contact ---- */
    "contact.p": "我对<strong>AI/ML 实习</strong>、<strong>研究助理职位</strong>，以及多模态 AI、世界模型、机器人、机器视觉与计算机视觉方向<strong>硕士机会</strong>的交流持开放态度。",
    "contact.emailLabel": "邮箱",
    "contact.locLabel": "所在地",
    "contact.locValue": "中国 南京",

    /* ---- Footer ---- */
    "footer.copy": "© 2026 Md Jisan Hossen · 南京信息工程大学",
    "footer.top": "返回顶部 ↑",
    "toTop.aria": "返回顶部",

    /* ---- Tags (conceptual only; tech names kept in English) ---- */
    "tag.preprint": "预印本",
    "tag.causal": "因果视频生成",
    "tag.vwm": "视频世界模型",
    "tag.adaptive": "自适应计算",
    "tag.efficient": "高效推理",
    "tag.uq": "不确定性量化",
    "tag.dit": "扩散 Transformer",
    "tag.worldmodels": "世界模型",
    "tag.repro": "可复现性",
    "tag.llmproxy": "LLM 代理",
    "tag.routing": "路由",
    "tag.cost": "成本优化",
    "tag.medimg": "医学影像"
  };

  var TITLE_ZH = "Md Jisan Hossen — AI 研究员 · 机器人、机器视觉与世界模型";
  var DESC_ZH = "Md Jisan Hossen —— 中国 NUIST 的人工智能本科生研究员。研究多模态 AI、生成式视频世界模型、机器人科学与工程、面向具身智能的机器视觉、LLM/NLP 与计算机视觉。关于因果视频生成中自适应时间粒度的第一作者预印本（Zenodo DOI 10.5281/zenodo.23395414 与 10.5281/zenodo.23693517）。预计 2027 年 7 月毕业。";

  function safeGet(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
  function safeSet(k, v) { try { window.localStorage.setItem(k, v); } catch (e) { /* ignore */ } }

  var els = Array.prototype.slice.call(document.querySelectorAll("[data-i18n]"));
  var altEls = Array.prototype.slice.call(document.querySelectorAll("[data-i18n-alt]"));
  var ariaEls = Array.prototype.slice.call(document.querySelectorAll("[data-i18n-aria]"));

  var origHtml = new Map();
  els.forEach(function (el) { origHtml.set(el, el.innerHTML); });
  var origAlt = new Map();
  altEls.forEach(function (el) { origAlt.set(el, el.getAttribute("alt")); });
  var origAria = new Map();
  ariaEls.forEach(function (el) { origAria.set(el, el.getAttribute("aria-label")); });

  var metaDesc = document.querySelector('meta[name="description"]');
  var origTitle = document.title;
  var origDesc = metaDesc ? metaDesc.getAttribute("content") : "";

  var btn = document.getElementById("langToggle");

  function has(key) { return Object.prototype.hasOwnProperty.call(DICT, key); }

  function apply(lang) {
    var zh = lang === "zh";

    els.forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (zh && has(key)) {
        el.innerHTML = DICT[key];
      } else {
        el.innerHTML = origHtml.get(el);
      }
    });

    altEls.forEach(function (el) {
      var key = el.getAttribute("data-i18n-alt");
      if (zh && has(key)) el.setAttribute("alt", DICT[key]);
      else el.setAttribute("alt", origAlt.get(el));
    });

    ariaEls.forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      if (zh && has(key)) el.setAttribute("aria-label", DICT[key]);
      else el.setAttribute("aria-label", origAria.get(el));
    });

    document.title = zh ? TITLE_ZH : origTitle;
    if (metaDesc) metaDesc.setAttribute("content", zh ? DESC_ZH : origDesc);

    document.documentElement.lang = zh ? "zh-CN" : "en";
    document.documentElement.setAttribute("data-lang", zh ? "zh" : "en");

    if (btn) {
      btn.textContent = zh ? "EN" : "中文";
      btn.setAttribute("aria-label", zh ? "Switch to English" : "切换到中文");
      btn.setAttribute("title", zh ? "Switch to English" : "切换到中文");
    }
  }

  var initial = safeGet(STORE_KEY) === "zh" ? "zh" : "en";
  apply(initial);

  if (btn) {
    btn.addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-lang") === "zh" ? "en" : "zh";
      apply(next);
      safeSet(STORE_KEY, next);
    });
  }
})();
