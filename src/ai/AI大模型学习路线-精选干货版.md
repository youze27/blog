---
title: AI 大模型学习路线
category:
  - AI
tag:
  - 学习路线
---
### ① 地基：Transformer 与 PyTorch

| 分值 | 知识点 / 概念 |
|---|---|
| 10 | Attention 机制（Self-Attention） |
| 10 | Transformer 总体架构 |
| 10 | Token 与 Tokenizer（BPE 分词） |
| 9 | Embedding / 词向量 |
| 9 | 多头注意力 Multi-Head Attention |
| 9 | PyTorch 张量（Tensor）与自动求导 autograd |
| 8 | Encoder / Decoder 架构 |
| 8 | 位置编码 Positional Encoding |
| 8 | 前向传播与反向传播 |
| 8 | 损失函数（交叉熵 Cross-Entropy） |
| 8 | 梯度下降与学习率 |
| 8 | GPT 的自回归生成（Causal LM） |
| 7 | Optimizer：Adam / AdamW |
| 7 | LayerNorm 与残差连接（Residual） |
| 7 | Softmax |
| 7 | 过拟合 / 欠拟合与正则化 |
| 7 | BERT（Masked LM，理解式预训练） |
| 7 | KV Cache（推理缓存） |
| 6 | 激活函数（ReLU / GELU / SiLU） |
| 6 | Batch / Epoch / Step 与 DataLoader |
| 6 | 线性代数基础（矩阵运算、点积） |
| 6 | 概率论基础（条件概率、最大似然） |
| 5 | 交叉验证与数据集划分 |
| 4 | RNN / LSTM（了解演进史即可） |
| 4 | CNN 卷积神经网络 |
| 4 | Word2Vec / GloVe / fastText |

### ② LLM 应用开发

| 分值 | 知识点 / 概念 |
|---|---|
| 10 | LLM API 调用（OpenAI SDK 兼容接口） |
| 10 | Prompt 工程（结构化提示词） |
| 9 | Chat Messages 结构（system / user / assistant 角色） |
| 9 | 采样参数：temperature / top_p |
| 9 | 上下文窗口 Context Window 与 max_tokens |
| 9 | Embedding 模型（OpenAI Embeddings / BGE） |
| 8 | 余弦相似度与向量相似检索 |
| 8 | Few-shot / Zero-shot 提示 |
| 8 | 结构化输出（JSON Mode） |
| 8 | 流式输出 Streaming / SSE |
| 8 | 大模型幻觉 Hallucination 与缓解 |
| 7 | Prompt 模板化（变量注入、系统提示词分层） |
| 7 | 多模态输入（图像理解、视觉问答） |
| 7 | 模型选型（Qwen / DeepSeek / GPT 系列对比） |
| 7 | Token 计费与成本估算 |
| 6 | T-SNE 降维可视化 |
| 6 | 主流 API 生态兼容（BaseURL 切换、本地模型接入） |

### ③ RAG 与向量数据库

| 分值 | 知识点 / 概念 |
|---|---|
| 10 | RAG 完整流程（加载→切分→向量化→检索→生成） |
| 9 | 文本切分 Chunking（定长/递归/分隔符/标题段落/语义 5 种） |
| 9 | chunk_size 与 overlap 参数 |
| 9 | 向量数据库核心概念（Collection / Index / 相似检索） |
| 9 | 混合检索（向量检索 + BM25 关键词检索） |
| 8 | 文档加载器（PDF / Word / Markdown / Excel 解析） |
| 8 | 向量索引算法（HNSW / IVF / FLAT） |
| 8 | RetrievalQA 检索问答链 |
| 8 | 重排序 Rerank |
| 8 | Milvus 2.6 实战（部署形态、核心参数、写入机制） |
| 7 | 元数据过滤 Metadata Filter |
| 7 | Query 改写与扩展（多查询、步骤拆解） |
| 7 | RAG 评估指标（召回率、忠实度、答案相关性） |
| 7 | GraphRAG（知识图谱增强检索） |
| 7 | Agentic / Adaptive / Corrective / Self RAG 变体 |
| 7 | Chroma 向量数据库 |
| 6 | 多模态 RAG（图文混合检索） |
| 6 | 父子块 Parent-Child Chunking |
| 6 | Embedding 维度、归一化与相似度度量选择 |
| 5 | HyDE（假设文档检索） |

### ④ Agent 与 MCP【当前最热】

| 分值 | 知识点 / 概念 |
|---|---|
| 10 | Function Calling / Tool Use |
| 10 | MCP 协议（Host / Client / Server 架构） |
| 10 | LangGraph：State / Node / Edge（图编排） |
| 9 | Agent Loop（观察→思考→调用工具→反馈→继续决策） |
| 9 | ReAct 模式（推理+行动交替） |
| 9 | 短期记忆与长期记忆 Memory |
| 9 | LangChain V1 框架（链、工具、模型抽象） |
| 8 | 条件边 Conditional Edge 与工作流路由 |
| 8 | Checkpoint 持久化与故障恢复 |
| 8 | Multi-Agent 协作（Supervisor / 分层 / GroupChat） |
| 8 | Harness Engineering（Agent 运行闭环设计） |
| 8 | 工具权限与安全边界（Tool Allowlist） |
| 8 | Sub-Agent 与复杂任务拆解 |
| 7 | 人机协同 HITL（人工确认节点） |
| 7 | Guardrails 安全护栏 |
| 7 | LCEL 表达式语法（Runnable 管道） |
| 7 | Planning Agent 与任务清单（write_todos / DAG） |
| 7 | 异步工作流 Async Workflow |
| 7 | AIMessage / ToolMessage 消息协议 |
| 6 | DeepResearch（多 Agent 长周期研究任务） |
| 5 | AgentScope 2.0 |
| 5 | AutoGen / CrewAI（对比了解） |

### ⑤ 私有化部署与微调

| 分值 | 知识点 / 概念 |
|---|---|
| 10 | LoRA 低秩适配微调 |
| 9 | 显存估算公式（参数量×精度+激活+KV Cache） |
| 9 | vLLM 推理框架（PagedAttention） |
| 9 | 指令微调数据集构建（instruction/input/output 格式） |
| 8 | 量化技术（GPTQ / AWQ / INT4 / INT8） |
| 8 | PEFT 参数高效微调 vs 全参微调 |
| 8 | Qwen3 模型家族（尺寸/推理模式/多模态） |
| 8 | DeepSeek 系列（V3 / R1 推理模型） |
| 8 | Hugging Face Transformers 与 Trainer |
| 8 | 训练超参数（学习率、梯度累积、warmup、权重衰减） |
| 7 | SGLang 推理框架 |
| 7 | QLoRA（4bit 量化底座 + LoRA） |
| 7 | 多模态微调（Qwen-VL、ViT、CLIP） |
| 7 | 训练监控（loss 曲线、过拟合判断） |
| 6 | 模型文件格式（safetensors / GGUF） |
| 6 | Ollama 本地运行 |
| 6 | 分布式训练（DDP / DeepSpeed） |
| 6 | Flash Attention |
| 6 | GLM-4 模型与应用开发 |
| 5 | Open WebUI 部署调用 |
| 5 | 推理解码策略（Greedy / Beam / 采样） |

### ⑥ 企业级工程化闭环

| 分值 | 知识点 / 概念 |
|---|---|
| 9 | FastAPI 后端服务 |
| 9 | Langfuse 可观测（Trace / Span / Generation） |
| 8 | SSE 流式接口封装（Agent 流式输出） |
| 8 | Docker 容器与镜像管理 |
| 8 | 评测闭环（Dataset → Experiment → Evaluator → Score） |
| 8 | DeepAgents 复杂 Agent 应用框架 |
| 8 | Agent 安全隔离（Sandbox 沙箱、任务分级授权） |
| 7 | Prompt 生命周期管理（Version / Label / Cache / Fallback） |
| 7 | Skills 技能架构（渐进式加载、Sandbox 执行） |
| 7 | uvicorn 服务器部署 |
| 6 | Golden Dataset 与回归测试（Baseline 对比） |
| 6 | 成本监控（Token 消耗统计） |
| 6 | Git 平台集成（自动 PR / Issue 处理） |
| 6 | 日志、故障恢复与风险控制 |
| 5 | 虚拟文件系统 Virtual Filesystem |
| 5 | WebHook 集成（企业微信 / 钉钉群交互） |
| 5 | 灰度发布与回滚 |

---

## 五阶段学习路线【第一版原文】

| 阶段 | 内容 | 建议时长 | 里程碑 |
|------|------|---------|--------|
| 1 打牢地基 | PyTorch、ML/DL 概念、**手写 Transformer/Attention** | 1-2 周 | 能白板画出并实现 Attention |
| 2 LLM 应用入门 | API 调用、Prompt 工程、Embedding 检索 | 2-3 周 | 跑通第一个 RAG：加载→Split→向量化→检索→问答 |
| 3 框架与 Agent（最核心） | LangChain V1、LangGraph、MCP、Function Calling、Multi-Agent、Agent Loop | 4-6 周 | 独立开发一个带工具/记忆/工作流的 Agent |
| 4 私有化部署与微调 | Qwen3/DeepSeek 部署、vLLM、显存计算、LoRA | 3-4 周 | 本地部署一个 9B 模型并完成 LoRA 微调 |
| 5 企业级项目实战 | RAG 知识库客服、TEXT2SQL、财务分析 Agent、手撕 Coding Agent、Langfuse 闭环 | 持续 | 交付"开发→观测→评估→优化→发布"完整闭环项目 |

## 项目实战优先级（选做 3-4 个即可）【第一版原文】

1. **RAG 企业知识库/智能客服**（贝壳网案例）——最通用，面试必备
2. **TEXT2SQL + Qwen3**（含记忆模块、异步工作流）——高频业务场景
3. **财务分析 Agent + Langfuse 可观测评估**——体现工程化深度
4. **手撕 OpenClaw / Claude Code 类 Coding Agent**（DeepAgents + Harness + Skills + Docker Sandbox）——当前最热方向
5. 次选：携程多 Agent 旅游助手、京东购买预测（偏传统 ML，可略）

---

## 知识点、内容、名词概念详细解释与定义

### 板块① 地基：Transformer 与 PyTorch

- **Attention 机制（Self-Attention）**：注意力机制是 Transformer 的核心。它让序列中每个 token 通过 Query（查询）、Key（键）、Value（值）三组向量计算与其他所有 token 的相关性权重（点积→缩放→Softmax→加权求和），从而实现"全局上下文理解"。Self-Attention 指序列对自己做注意力，解决了 RNN 无法并行、长距离依赖弱的问题。
- **Transformer 总体架构**：2017 年论文《Attention Is All You Need》提出的架构，由堆叠的 Encoder（编码器，双向理解输入）和 Decoder（解码器，自回归生成输出）组成，每层包含多头注意力 + 前馈网络（FFN）+ 残差连接 + LayerNorm。现代大模型（GPT、Qwen、DeepSeek）基本只使用 Decoder 部分。
- **Token 与 Tokenizer（BPE）**：Token 是模型处理文本的最小单位（可能是词、子词或字符）。Tokenizer 将原始文本切成 Token 并映射为整数 ID，主流算法为 BPE（Byte Pair Encoding，字节对编码）及其变体。一个汉字通常对应 1-2 个 Token，直接决定上下文长度和 API 计费。
- **Embedding / 词向量**：把 Token 映射为高维稠密向量（如 1536 维）的过程，语义相近的词在向量空间中距离更近。是向量检索和 RAG 的基础。
- **多头注意力 Multi-Head Attention**：将 Attention 并行拆成多组（多"头"），每组在不同的子空间学习不同的关系模式（如语法关系、指代关系），最后拼接输出，增强模型表达能力。
- **PyTorch 张量与自动求导**：Tensor 是支持 GPU 加速的多维数组；autograd 自动记录计算图并反向传播梯度（`loss.backward()`），是深度学习训练的基础机制。
- **Encoder / Decoder**：Encoder 将输入序列编码为上下文表示（代表：BERT，双向注意力）；Decoder 逐 Token 自回归生成输出（代表：GPT，带因果掩码的注意力）。机器翻译等 seq2seq 任务使用两者组合。
- **位置编码 Positional Encoding**：Self-Attention 本身不感知顺序，需要额外注入位置信息。经典方案是正弦位置编码，现代大模型普遍使用 RoPE（旋转位置编码）。
- **前向传播与反向传播**：前向传播是输入经过网络逐层计算得到输出与损失；反向传播依据链式法则从损失出发逐层计算梯度，供优化器更新参数。
- **损失函数（交叉熵）**：衡量模型预测分布与真实分布的差异。语言模型训练即"预测下一个 Token"的分类任务，使用交叉熵作为损失。
- **梯度下降与学习率**：沿负梯度方向迭代更新参数以最小化损失；学习率控制每步更新幅度，过大震荡、过小收敛慢，常配合 warmup 和衰减策略。
- **GPT 的自回归生成（Causal LM）**：GPT 类模型基于前文逐个预测下一个 Token，生成过程是循环"输入→预测→拼接→再预测"，因果掩码保证每个位置只能看到左侧内容。
- **Optimizer：Adam / AdamW**：自适应学习率优化器，结合动量与二阶矩估计。AdamW 在 Adam 基础上修正了权重衰减的实现方式，是当前大模型训练/微调的默认选择。
- **LayerNorm 与残差连接**：LayerNorm 对每个样本的特征做归一化，稳定训练；残差连接将层的输入直接加到输出上（`x + F(x)`），缓解深层网络的梯度消失。
- **Softmax**：将任意实数向量归一化为和为 1 的概率分布，用于输出词表概率和注意力权重。
- **过拟合 / 欠拟合与正则化**：过拟合是训练集表现好但泛化差（微调小数据集时高发），欠拟合是训练都不充分；缓解手段包括 Dropout、权重衰减、早停、扩充数据。
- **BERT（Masked LM）**：双向 Encoder 模型，通过"随机遮盖词并预测"的方式预训练，擅长理解类任务（分类、NER、句向量），不擅长生成。
- **KV Cache**：自回归推理时缓存已计算过的 Key/Value 矩阵，避免每生成一个 Token 就重算全部历史，是推理加速的关键；其大小随上下文长度线性增长，是长上下文显存占用的主要来源之一。
- **激活函数**：为网络引入非线性。Transformer 的 FFN 层现代主流使用 GELU / SiLU（SwiGLU）。
- **Batch / Epoch / Step 与 DataLoader**：Batch 是一次前向/反向所用的样本数；Epoch 是完整遍历一遍数据集；Step 是一次参数更新。DataLoader 负责 batch 划分、打乱与并行加载。
- **线性代数基础**：重点掌握矩阵乘法、点积（Attention 的核心运算）、转置与形状变换（view/reshape），不必深挖证明。
- **概率论基础**：条件概率、最大似然估计、期望与方差——理解语言建模"预测下一个词的概率分布"所需的最低限度。
- **交叉验证与数据集划分**：训练/验证/测试集划分（如 8:1:1），验证集用于调参与早停。
- **RNN / LSTM**：循环神经网络按时间步串行处理序列，LSTM 通过门控缓解长依赖问题；因无法并行已被 Transformer 取代，仅需了解演进脉络。
- **CNN**：卷积神经网络，用卷积核提取局部空间特征，是视觉领域经典架构，了解即可（视觉大模型已转向 ViT）。
- **Word2Vec / GloVe / fastText**：静态词向量技术，一词一向量、无法处理一词多义；已被基于 Transformer 的动态上下文 Embedding 取代，了解概念即可。

### 板块② LLM 应用开发

- **LLM API 调用**：通过 HTTP/SDK 调用大模型服务。业界事实标准是 OpenAI SDK 兼容格式（`base_url` + `api_key` + `model` 三要素），切换 Qwen、DeepSeek、本地 vLLM 只需改 BaseURL，因此这一套接口必须精通。
- **Prompt 工程**：通过设计和组织提示词控制模型输出的技术与工程，包括角色设定、任务拆解、输出格式约束、Few-shot 示例、思维链（CoT）等。是应用开发中投入产出比最高的技能。
- **Chat Messages 结构**：对话消息由 `role`（system 系统设定 / user 用户 / assistant 模型回复 / tool 工具结果）和 `content` 组成；system 消息定义模型的人设与规则，权重高于普通消息。
- **temperature / top_p**：解码采样参数。temperature 越高输出越随机有创造性，越低越确定（0 近似贪心）；top_p（核采样）只从累计概率前 p 的候选词中采样。一般"严谨任务低温、创作任务高温"，两者通常只调一个。
- **上下文窗口 Context Window**：模型单次能处理的最大 Token 数（输入+输出共享），决定能塞进多少文档/对话历史；超出需截断、摘要或检索（RAG 的动因之一）。
- **Embedding 模型**：将文本映射为语义向量的专用模型，如 OpenAI text-embedding、开源 BGE / bge-m3。选型看维度、中英能力、最大长度和 MTEB 榜单。
- **余弦相似度**：两向量夹角的余弦值（-1~1），忽略模长只看方向，是向量检索最常用的相似度度量。
- **Few-shot / Zero-shot**：Zero-shot 不给示例直接下指令；Few-shot 在提示词中附几个输入-输出示例引导模型模仿。示例数量与质量显著影响小模型表现。
- **结构化输出（JSON Mode）**：强制模型按 JSON Schema 输出，便于程序解析；实现方式有 JSON Mode、结构化输出 API、提示词约束+重试解析。
- **流式输出 Streaming / SSE**：服务端逐 Token 推送生成结果（Server-Sent Events），用户边生成边看到文字，显著降低感知延迟，是所有对话类应用的标配。
- **幻觉 Hallucination**：模型一本正经地编造事实。缓解手段：RAG 提供事实依据、Prompt 要求"不知道就说不知道"、低温采样、引用溯源、输出校验。
- **Prompt 模板化**：将提示词抽成带变量的模板（系统提示/用户提示分层管理），实现可配置、可版本化，是企业级应用的基本要求。
- **多模态输入**：向模型传图片（乃至音频/视频）进行理解，如 GPT-4o、Qwen-VL。典型场景：票据识别、图表问答、医疗影像。
- **模型选型**：按任务、成本、部署条件选模型——通用能力看 GPT/Claude；国内合规与私有化看 Qwen/DeepSeek/GLM；推理任务看 DeepSeek-R1 类推理模型。
- **Token 计费与成本估算**：API 按输入/输出 Token 分别计价（输出更贵）。估算：一次调用 Token ≈ 字符数×（中文约 0.6-1.5），再乘单价与调用量。
- **T-SNE**：把高维向量降到 2 维做可视化的方法，用于直观查看 Embedding 聚类效果（相似语义是否聚在一起）。
- **API 生态兼容**：本地部署的 vLLM/Ollama 均提供 OpenAI 兼容接口，应用层代码无需改动即可在"云端 API"与"私有化模型"间切换。

### 板块③ RAG 与向量数据库

- **RAG 完整流程**：检索增强生成。离线链路：加载文档→文本切分→Embedding 向量化→入库向量数据库；在线链路：用户提问→问题向量化→相似检索 Top-K→拼入 Prompt→模型生成答案。核心价值：让模型基于私有/最新知识回答，抑制幻觉、免训练更新知识。
- **文本切分 Chunking（5 种）**：定长切分器（按固定字符数）、递归切分器（按段落→句子→字符层级递归，最常用默认）、分隔符切分器（按 \n\n 等）、标题和段落切分器（按文档结构）、语义切分器（按 Embedding 相似度断句，效果最好成本最高）。
- **chunk_size 与 overlap**：块大小决定检索粒度——太大噪声多、太小上下文不完整；overlap 是相邻块的重叠字符数，防止关键句被切断。经验值 300-800 字符、overlap 10-20%。
- **向量数据库核心概念**：专门存储向量并支持 ANN（近似最近邻）检索的数据库。核心对象：Collection（集合/表）、向量+元数据、相似度度量、索引类型。
- **混合检索**：向量检索（语义）+ BM25（关键词精确匹配）并行检索后融合排序（常用 RRF 倒数排名融合），兼顾"意思相近"和"专有名词精确命中"，是生产环境标配。
- **文档加载器**：解析 PDF、Word、Markdown、Excel 等格式为统一 Document（文本+元数据）。难点在 PDF 表格与图片（PDFplumber 等工具），解析质量直接决定 RAG 上限。
- **向量索引算法**：FLAT 暴力精确检索（小数据量）；IVF 倒排文件索引（聚类分桶再搜）；HNSW 分层图索引（当前主流，高召回低延迟，内存占用较大）。
- **RetrievalQA 链**：LangChain 封装的"检索→拼 Prompt→生成"标准问答链，是构建 RAG 应用的最小完整单元。
- **重排序 Rerank**：初检索（向量库，快但粗）返回 Top-50，再用 Cross-Encoder 类 Rerank 模型精排出 Top-5 给模型。精度显著提升，是 RAG 提效最明显的一环。
- **Milvus 2.6**：开源分布式向量数据库，支持标量+向量混合查询、多种索引、多种部署形态（Lite 单机 / Standalone / Distributed）。生产级 RAG 主流选择，需掌握 Collection 设计、索引参数（nlist/ef）与写入机制。
- **元数据过滤**：检索时按来源、时间、类别等标量字段先过滤再向量搜索（如"只搜 2026 年的合同"），企业知识库必备能力。
- **Query 改写与扩展**：用户原始问题往往检索不友好。手段：多查询改写（一问变多问）、查询拆解（复合问题拆子问题）、语义补全。
- **RAG 评估**：检索侧看召回率/命中率；生成侧看忠实度（答案是否忠于检索内容）与答案相关性。工具：RAGAS 等。没有评估的 RAG 无法迭代。
- **GraphRAG**：用 LLM 从文档抽取实体与关系构建知识图谱，检索时沿图扩展关联上下文，擅长"全局性、多跳"问题（如"总结某主题的整体脉络"），弥补普通 RAG 只能局部检索的短板。
- **RAG 变体**：Agentic RAG（由 Agent 决定何时检索、检索什么）；Adaptive RAG（按问题复杂度路由不同检索策略）；Corrective RAG（评估检索结果质量，不合格就重检索/兜底）；Self RAG（模型自我批判是否需要检索、答案是否可信）。
- **Chroma**：轻量级开源向量数据库，几行代码即可起步，适合原型和小规模场景；大规模生产选 Milvus。
- **多模态 RAG**：对图片/表格也做向量化与检索（用多模态 Embedding 如 GME 模型），实现图文混合知识库问答。
- **父子块 Parent-Child**：用小块（子块）做精准检索、命中后返回其所属大块（父块）给模型，兼顾检索精度与上下文完整性。
- **Embedding 维度与归一化**：维度越高表达力越强但存储计算越大；向量做 L2 归一化后，内积=余弦相似度，检索效率更高。
- **HyDE**：假设文档检索——先让 LLM 生成一个"假设的理想答案"，用它的向量去检索真实文档，常优于直接用问题检索。

### 板块④ Agent 与 MCP【当前最热】

- **Function Calling / Tool Use**：让 LLM 以结构化方式"调用工具"的机制——开发者向模型描述工具（名称、功能、参数 Schema），模型判断需要时输出 JSON 格式的调用请求（工具名+参数），程序执行后把结果回传模型继续推理。是 Agent 一切能力的基石，必须精通。
- **MCP（Model Context Protocol）**：Anthropic 于 2024 年底推出的开放标准，统一 LLM 与外部数据源、工具之间的通信协议（基于 JSON-RPC）。架构三角色：Host（宿主应用，如 Claude Desktop / IDE）、Client（维护与 Server 的连接）、Server（提供 Tools 工具、Resources 资源、Prompts 提示模板三类能力）。价值：工具写一次，任何支持 MCP 的 AI 应用都能用，解决 M×N 集成问题。
- **LangGraph 图编排**：以"状态图"方式编排 Agent——State（共享状态，如消息列表）在 Node（节点，函数/模型调用）间沿 Edge（边）流转；支持条件边（按状态路由）、循环（Agent 反复思考-行动）、Checkpoint（状态持久化）。是当前构建可控 Agent 工作流的主流框架。
- **Agent Loop**：Agent 的基本运行闭环——观察（获取输入/工具结果）→思考（LLM 决策）→调用工具→接收反馈→继续决策直到任务完成。理解此循环是从"会调 API"升级到"会设计 Agent"的分水岭。
- **ReAct 模式**：Reasoning + Acting——模型交替输出"思考（Thought）→行动（Action）→观察（Observation）"，是最经典的 Agent 提示范式，Function Calling 本质是其工程化版本。
- **Memory 记忆**：短期记忆=当前会话上下文（受窗口限制，需管理压缩）；长期记忆=跨会话持久化（存向量库/数据库，按需检索注入）。LangGraph 通过 Checkpoint+Store 实现两级记忆。
- **LangChain V1**：应用开发框架，提供模型抽象（统一各家 API）、工具、链式编排（LCEL）、记忆等组件。V1 重构后与 LangGraph 深度整合，聚焦 Agent 开发。
- **条件边 Conditional Edge**：LangGraph 中根据当前 State 动态决定下一个节点的机制（如"检索结果合格→生成；不合格→重检索"），是实现分支路由与循环的核心。
- **Checkpoint 持久化**：把图执行状态逐步存入存储（内存/SQLite/Postgres），实现断点恢复、时间旅行调试、多轮会话续接。
- **Multi-Agent 协作**：多个各司其职的 Agent 协同完成复杂任务。常见模式：Supervisor（主管分派、汇总）、分层智能体（主管管子主管）、GroupChat（群聊式多 Agent 讨论）、Planning（规划器生成任务 DAG 后执行）。
- **Harness Engineering**：超越 Prompt Engineering 的工程方法论——设计 Agent 的完整运行闭环，涵盖上下文管理（Context Engineering）、工具体系、状态与记忆、权限边界、日志、故障恢复、流式输出。当前最热方向（Claude Code / OpenClaw 类产品的核心架构思路）。
- **Tool Allowlist 工具白名单**：限制 Agent 可用工具与执行边界（只允许访问指定目录、指定 SQL 表、只读/写分离），是企业级 Agent 安全控制的基础手段。
- **Sub-Agent 任务拆解**：主 Agent 把长周期复杂任务拆给专门的子 Agent（如 Researcher 检索、Reviewer 审核），各自独立上下文，最后汇总，避免单一上下文过载。
- **HITL 人机协同**：在关键节点（如高危操作、付款、删除）暂停并请求人工确认/修改后继续执行；LangGraph 提供 interrupt 机制实现。
- **Guardrails 安全护栏**：对输入/输出做校验拦截的防护层——敏感词过滤、越权指令拦截、输出格式与合规校验，防止模型行为越界。
- **LCEL（LangChain Expression Language）**：LangChain 的声明式管道语法，用 `|` 把组件串成 Runnable 链（`prompt | model | parser`），自动获得流式、批量、异步、重试能力。
- **Planning Agent 与任务清单**：先由规划 Agent 把目标拆成任务 DAG（有向无环图）再逐步执行；write_todos 类工具维护任务清单，执行中动态勾选、更新。
- **异步工作流 Async Workflow**：用 async/await 并行执行互不依赖的节点（同时查航班+酒店），缩短 Agent 总耗时；LangGraph/LangChain 原生支持异步。
- **AIMessage / ToolMessage**：LangChain 消息协议——AIMessage 承载模型回复与工具调用请求，ToolMessage 承载工具执行结果并回传模型，两者配对构成工具调用循环。
- **DeepResearch**：多 Agent 长周期研究任务——规划→多路检索→交叉验证→综合报告，通常是"主 Agent + 检索 Sub-Agent + 撰写 Agent"的组合。
- **AgentScope 2.0**：阿里开源的多 Agent 框架，与 LangGraph 定位类似，了解其存在即可。
- **AutoGen / CrewAI**：其他主流 Multi-Agent 框架（微软 AutoGen 群聊范式、CrewAI 角色分工范式），面试对比可聊，深入一个（LangGraph）即可。

### 板块⑤ 私有化部署与微调

- **LoRA（Low-Rank Adaptation）**：参数高效微调的核心技术。冻结原模型权重，只在旁路注入低秩分解矩阵 ΔW=BA（秩 r 很小，如 8/16）参与训练，可训练参数量降至原来的 0.1%-1%，单卡即可微调 9B 级模型；训练产物是几十 MB 的 Adapter，可插拔、可合并回原模型。必须精通（原理+训练+部署全链路）。
- **显存估算公式**：经验法则——模型权重显存 ≈ 参数量 × 每参数字节数（FP16=2 字节、INT8=1、INT4=0.5），再乘 1.2-1.5 倍系数覆盖激活与开销，另加 KV Cache（随上下文长度增长）。例：7B 模型 FP16 约 14GB，INT4 约 3.5-4GB。据此反推 GPU 选型。
- **vLLM**：当前最主流的开源推理框架。核心是 PagedAttention——像操作系统分页管理内存一样管理 KV Cache，显存利用率与吞吐量大幅提升；提供 OpenAI 兼容接口、连续批处理（Continuous Batching）。
- **指令微调数据集**：微调质量取决于数据。标准格式为 `instruction`（指令）+ `input`（可选输入）+ `output`（期望回答）的 JSON 对；要点：数据清洗去重、风格统一、覆盖目标场景，几百到几万条即可见效。
- **量化（GPTQ / AWQ / INT4 / INT8）**：把 FP16 权重压缩到 INT8/INT4 以降低显存、提升推理速度，精度略降。GPTQ 与 AWQ 是主流训练后量化（PTQ）算法。
- **PEFT vs 全参微调**：全参微调更新全部权重（效果上限高、成本极高）；PEFT（LoRA、QLoRA、P-Tuning 等）只训练少量附加参数，性价比高，是 99% 场景的选择。
- **Qwen3 家族**：阿里通义千问系列（0.6B→235B 多尺寸，MoE 与 Dense 并存），支持思考/非思考双模式，配套 Qwen-VL 多模态。国内私有化部署首选之一。
- **DeepSeek 系列**：DeepSeek-V3（通用 MoE 基座）与 DeepSeek-R1（推理模型，通过强化学习习得长思维链，数学/代码能力强，输出含思考过程）。API 便宜、开源权重可私有化。
- **Hugging Face Transformers / Trainer**：模型加载（`AutoModelForCausalLM`）、Tokenizer、Trainer 训练器（配置学习率、批次、日志、保存策略）的标准化工具链，微调代码的事实标准。
- **训练超参数**：微调关键参数——学习率（LoRA 常用 1e-4~2e-5）、梯度累积（小显存模拟大 batch）、warmup（前期小步预热）、权重衰减（正则化）、epoch 数（微调通常 1-3）。
- **SGLang**：高性能推理框架，以 RadixAttention（前缀 KV Cache 复用）著称，多轮对话与高并发场景吞吐优秀，与 vLLM 并列主流。
- **多模态微调（Qwen-VL / ViT / CLIP）**：ViT 把图像切块当 Token 编码；CLIP 实现图文对齐表示；对 Qwen-VL 做 LoRA 微调即可让模型学会领域图像理解（如医疗影像诊断），需配套构建图文指令数据。
- **训练监控**：观察 train/eval loss 曲线——eval loss 回升即过拟合（早停）；loss 不降查学习率与数据；配合观察生成样例质量。
- **safetensors / GGUF**：safetensors 是 Hugging Face 标准安全权重格式；GGUF 是 llama.cpp/Ollama 生态的量化模型格式，用于消费级设备本地运行。
- **Ollama**：一键在本地跑量化模型的工具（`ollama run qwen3`），内置 OpenAI 兼容接口，适合开发调试与个人使用。
- **分布式训练（DDP / DeepSpeed）**：DDP 数据并行（多卡各持完整模型、分数据）；DeepSpeed ZeRO 分片优化器/梯度/参数，让全参微调大模型成为可能。LoRA 场景通常用不到，了解即可。
- **Flash Attention**：注意力计算的 IO 感知优化实现，不改变数学结果但大幅提速省显存，现代训练/推理默认开启。
- **GLM-4**：智谱 AI 的模型系列，中文能力强，ChatGLM 生态成熟，部分国企/央企场景常用。
- **Open WebUI**：开源 Web 界面，可接入本地 Ollama/vLLM 模型，用于微调后模型的快速演示验收。
- **解码策略**：Greedy（每步取最大概率，确定）、Beam Search（保留多条候选路径，适合翻译）、采样（temperature/top_p，适合对话创作）。

### 板块⑥ 企业级工程化闭环

- **FastAPI**：Python 高性能 Web 框架（异步、自动生成 OpenAPI 文档、Pydantic 校验），是封装 Agent 为 HTTP 服务的标准选择。
- **Langfuse 可观测**：开源 LLM 工程观测平台。Trace（一次完整请求追踪）→ Span（子步骤）→ Generation（每次模型调用，含 Prompt/补全/Token/成本）；支持 Session、User、Environment 维度。解决"Agent 是黑盒、出错不知道哪一步"的问题。
- **SSE 流式接口**：FastAPI 中用 `StreamingResponse` 包装 Agent 的流式输出，前端逐字渲染；需正确传递主 Agent、SubAgent、AIMessage、ToolMessage 各类事件。
- **Docker 容器与镜像**：把 Agent 及其依赖打包为可移植镜像；在工程化体系中更关键的角色是**用容器做代码执行沙箱**——外部 Skill/生成代码在隔离容器中运行，保障宿主安全。
- **评测闭环**：Dataset（测试用例集）→ Experiment（批量跑一轮）→ Evaluator（正确性/完整性/引用等维度打分）→ Score（量化得分），对比不同模型/Prompt/Agent 版本的效果，是持续迭代的数据依据。
- **DeepAgents**：专为复杂长周期 Agent 任务设计的框架（任务清单 write_todos、规划器、Sub-Agent、虚拟文件系统），是"手撕 OpenClaw/Claude Code"类项目的底座。
- **Sandbox 沙箱隔离**：限制 Agent 代码执行的文件系统与命令边界（如阿里云 OpenSandbox、Docker 容器），区分只读任务/方案任务/编码任务并给予不同权限——企业内部 Agent 落地的安全底线。
- **Prompt 生命周期管理**：Prompt 像代码一样管理——Name（命名）、Version（版本）、Label（标签如 prod/dev）、Cache（缓存）、Fallback（降级备选）、灰度与回滚。Langfuse 内置该能力。
- **Skills 架构**：把 Agent 能力封装为可插拔技能包（指令+脚本+资源），按需渐进式加载进 Sandbox 执行（参考 OpenClaw/ClawHub 生态），避免全部塞入上下文。
- **uvicorn**：ASGI 服务器，负责运行 FastAPI 应用，生产环境配合多 worker 部署。
- **Golden Dataset 与回归测试**：人工沉淀的高质量"黄金测试集"（含标注、人工评分、修正后输出、Baseline 基线），每次改 Prompt/换模型后跑一遍，确保效果不回退。
- **成本监控**：按 Session/User/Environment 统计 Token 消耗与费用，识别异常调用，是 Agent 商业化的必要看板。
- **Git 平台集成**：Coding Agent 与私有 Git 整合——自动读 Issue、写代码、提 PR、响应评审意见；涉及凭证管理与权限控制。
- **日志与故障恢复**：结构化记录每步决策与工具调用，配合 Checkpoint 实现失败重试与断点续跑，区分可重试错误与需人工介入错误。
- **虚拟文件系统（Virtual Filesystem）**：为 Agent 提供隔离的虚拟文件层，Agent 操作的是虚拟路径，防止读写真实宿主文件造成泄露（企业级 Coding Agent 的防泄露方案）。
- **WebHook 集成**：通过回调 URL 让外部系统（企业微信/钉钉群、Git 平台）触发或接收 Agent 事件，实现"群内 @机器人执行任务"类交互。
- **灰度发布与回滚**：新版本 Prompt/Agent 先对小流量用户放量，监控指标达标后全量；异常时一键切回旧版本（配合 Prompt Label 机制）。

---

## 开源项目与官方文档资源（按板块查阅）

### 板块① 地基：Transformer 与 PyTorch
- PyTorch 官方教程（入门首选）：https://pytorch.org/tutorials/
- 《Attention Is All You Need》原论文：https://arxiv.org/abs/1706.03762
- The Illustrated Transformer（最好的图解文章）：https://jalammar.github.io/illustrated-transformer/
- nanoGPT（Karpathy 手写 GPT，配合"Let's build GPT"视频动手实现）：https://github.com/karpathy/nanoGPT
- Hugging Face Transformers 文档：https://huggingface.co/docs/transformers
- BERT 原论文：https://arxiv.org/abs/1810.04805

### 板块② LLM 应用开发
- OpenAI API 官方文档（业界事实标准）：https://platform.openai.com/docs
- OpenAI Cookbook（官方示例代码库）：https://cookbook.openai.com/
- OpenAI Python SDK：https://github.com/openai/openai-python
- Prompt Engineering Guide（提示词工程百科，有中文版）：https://www.promptingguide.ai/zh
- tiktoken（Token 计数工具）：https://github.com/openai/tiktoken
- BGE / bge-m3 开源 Embedding 模型：https://huggingface.co/BAAI/bge-m3

### 板块③ RAG 与向量数据库
- Milvus 官方文档（含 2.6 版本）：https://milvus.io/docs
- Milvus GitHub：https://github.com/milvus-io/milvus
- Chroma 官方文档：https://docs.trychroma.com/
- LangChain 官方文档（Text Splitters / Retrievers / RAG 教程都在这里）：https://python.langchain.com/docs/
- LangChain RAG 官方教程（从零搭 RAG）：https://python.langchain.com/docs/tutorials/rag/
- RAGAS（RAG 评估框架）：https://github.com/explodinggradients/ragas
- Microsoft GraphRAG：https://github.com/microsoft/graphrag
- pdfplumber（PDF 表格提取）：https://github.com/jsvine/pdfplumber
- rank_bm25（BM25 关键词检索）：https://github.com/dorianbrown/rank_bm25
- bge-reranker（重排序模型）：https://huggingface.co/BAAI/bge-reranker-large

### 板块④ Agent 与 MCP【当前最热】
- LangChain GitHub：https://github.com/langchain-ai/langchain
- LangGraph 官方文档（State/Checkpoint/HITL 全在这里）：https://langchain-ai.github.io/langgraph/
- LangChain Academy（官方免费课程，含 Deep Research / Multi-Agent 课）：https://academy.langchain.com/
- MCP 官网（协议规范 + 快速开始）：https://modelcontextprotocol.io/
- MCP GitHub 组织（协议 + 各语言 SDK）：https://github.com/modelcontextprotocol
- MCP Python SDK（服务端开发）：https://github.com/modelcontextprotocol/python-sdk
- DeepAgents（复杂 Agent 框架）：https://github.com/langchain-ai/deepagents
- AutoGen（微软多 Agent 框架，对比了解）：https://github.com/microsoft/autogen
- CrewAI（角色分工多 Agent 框架）：https://github.com/crewAIInc/crewAI
- AgentScope（阿里多 Agent 框架）：https://github.com/agentscope-ai/agentscope

### 板块⑤ 私有化部署与微调
- vLLM 官方文档（部署推理首选）：https://docs.vllm.ai/
- vLLM GitHub：https://github.com/vllm-project/vllm
- SGLang GitHub：https://github.com/sgl-project/sglang
- Hugging Face PEFT（LoRA 官方库，含文档与示例）：https://github.com/huggingface/peft
- LLaMA-Factory（一站式微调工具，实战强烈推荐）：https://github.com/hiyouga/LLaMA-Factory
- Unsloth（极致提速的 LoRA 微调库，低显存友好）：https://github.com/unslothai/unsloth
- Qwen3 模型仓库：https://github.com/QwenLM/Qwen3
- DeepSeek-V3：https://github.com/deepseek-ai/DeepSeek-V3
- DeepSeek-R1：https://github.com/deepseek-ai/DeepSeek-R1
- GLM-4：https://github.com/zai-org/GLM-4
- Ollama：https://github.com/ollama/ollama
- Open WebUI：https://github.com/open-webui/open-webui
- Flash Attention：https://github.com/Dao-AILab/flash-attention
- DeepSpeed：https://github.com/deepspeedai/DeepSpeed

### 板块⑥ 企业级工程化闭环
- Langfuse 官方文档（可观测/评估/Prompt 管理一站式）：https://langfuse.com/docs
- Langfuse GitHub（可自部署）：https://github.com/langfuse/langfuse
- FastAPI 官方文档（中文版可切换）：https://fastapi.tiangolo.com/
- uvicorn：https://www.uvicorn.org/
- Docker 官方文档：https://docs.docker.com/
- E2B（开源代码执行沙箱，OpenSandbox 的同类替代）：https://github.com/e2b-dev/E2B

---

## 核心英文术语清单

### ① 地基：Transformer 与 PyTorch

| 英文 | 中文 |
|---|---|
| Transformer | 变换器（架构名） |
| Attention | 注意力 |
| Self-Attention | 自注意力 |
| Multi-Head Attention | 多头注意力 |
| Token | 词元 |
| Tokenizer | 分词器 |
| Embedding | 嵌入 / 词向量 |
| Encoder | 编码器 |
| Decoder | 解码器 |
| Tensor | 张量 |
| Gradient | 梯度 |
| Gradient Descent | 梯度下降 |
| Forward Propagation | 前向传播 |
| Backpropagation | 反向传播 |
| Loss Function | 损失函数 |
| Cross-Entropy | 交叉熵 |
| Softmax | 归一化指数函数 |
| Positional Encoding | 位置编码 |
| Residual Connection | 残差连接 |
| Layer Normalization | 层归一化 |
| Feedforward Network (FFN) | 前馈网络 |
| Activation Function | 激活函数 |
| Overfitting / Underfitting | 过拟合 / 欠拟合 |
| Regularization | 正则化 |
| Optimizer | 优化器 |
| Learning Rate | 学习率 |
| Weight Decay | 权重衰减 |
| Warmup | 预热 |
| Epoch | 轮次 |
| Batch | 批次 |
| KV Cache | 键值缓存 |
| Auto-regressive | 自回归的 |
| Causal LM | 因果语言模型 |
| Pre-training | 预训练 |
| Fine-tuning | 微调 |

### ② LLM 应用开发

| 英文 | 中文 |
|---|---|
| Prompt | 提示词 |
| Context Window | 上下文窗口 |
| Temperature | 温度（采样参数） |
| Top-p / Nucleus Sampling | 核采样 |
| Max Tokens | 最大生成词元数 |
| Streaming | 流式输出 |
| Hallucination | 幻觉 |
| Few-shot / Zero-shot | 少样本 / 零样本 |
| Multimodal | 多模态 |
| Inference | 推理 |
| Vector | 向量 |
| Dimension | 维度 |
| Cosine Similarity | 余弦相似度 |
| ★ Chain-of-Thought (CoT) | 思维链 |
| ★ Prompt Injection | 提示词注入（攻击） |

### ③ RAG 与向量数据库

| 英文 | 中文 |
|---|---|
| Retrieval-Augmented Generation (RAG) | 检索增强生成 |
| Retrieval / Retriever | 检索 / 检索器 |
| Chunking | 文本切分 |
| Overlap | 重叠 |
| Vector Database | 向量数据库 |
| Index / Indexing | 索引 |
| HNSW | 分层图索引（逐字母读） |
| IVF | 倒排文件索引 |
| BM25 | 关键词检索算法 |
| Hybrid Search | 混合检索 |
| Rerank | 重排序 |
| Metadata | 元数据 |
| Query | 查询 |
| Recall | 召回率 |
| Faithfulness | 忠实度 |
| Knowledge Graph | 知识图谱 |
| ★ Grounding | 事实锚定（答案有据可依） |

### ④ Agent 与 MCP

| 英文 | 中文 |
|---|---|
| Agent | 智能体 |
| Function Calling / Tool Use | 函数调用 / 工具使用 |
| Protocol | 协议 |
| Host / Client / Server | 宿主 / 客户端 / 服务端 |
| State | 状态 |
| Node / Edge | 节点 / 边 |
| Conditional Edge | 条件边 |
| Checkpoint | 检查点 / 存档 |
| Memory | 记忆 |
| Supervisor | 监督者（多智能体模式） |
| Workflow | 工作流 |
| Human-in-the-Loop (HITL) | 人机协同 |
| Guardrails | 安全护栏 |
| Sandbox | 沙箱 |
| Asynchronous (Async) | 异步的 |
| Runnable | 可运行对象 |
| DAG (Directed Acyclic Graph) | 有向无环图 |
| Orchestration | 编排 |
| Reasoning | 推理 / 思考 |
| Observation | 观察 |
| ★ Context Engineering | 上下文工程 |

### ⑤ 私有化部署与微调

| 英文 | 中文 |
|---|---|
| LoRA (Low-Rank Adaptation) | 低秩适配微调（读"洛拉"） |
| Quantization | 量化 |
| Throughput | 吞吐量 |
| Latency | 延迟 |
| VRAM | 显存 |
| Gradient Accumulation | 梯度累积 |
| Mixture of Experts (MoE) | 专家混合架构 |
| Vision Language Model (VLM) | 视觉语言模型 |
| Open Weights | 开放权重 |
| ★ Distillation | 蒸馏（模型压缩） |
| ★ Reinforcement Learning (RL) | 强化学习 |
| ★ Scaling Law | 缩放定律 |

### ⑥ 企业级工程化闭环

| 英文 | 中文 |
|---|---|
| Observability | 可观测性 |
| Trace / Span | 追踪链 / 子步骤 |
| Evaluation | 评估 |
| Benchmark | 基准测试 |
| Leaderboard | 榜单（如 MTEB） |
| Baseline | 基线 |
| Regression Test | 回归测试 |
| Golden Dataset | 黄金数据集 |
| Rollback | 回滚 |
| Canary / Gray Release | 灰度发布 |
| Webhook | 网络钩子 |
| Container / Image | 容器 / 镜像 |
| Deployment | 部署 |
| ★ Alignment | 对齐 |
| ★ RLHF (Reinforcement Learning from Human Feedback) | 基于人类反馈的强化学习 |
