export type SolutionGroup = "Use Case" | "Industry";

export interface Solution {
  slug: string;
  group: SolutionGroup;
  name: string;
  /** Short label used in the nav dropdown */
  menuDescription: string;
  /** Hero eyebrow */
  eyebrow: string;
  /** Hero headline */
  headline: string;
  /** Hero subhead */
  subhead: string;
  /** Hero image from /public/assets */
  image: string;
  /** Three-to-four capability cards */
  capabilities: { title: string; description: string }[];
  /** Spec / proof-point stat strip */
  stats: { value: string; label: string }[];
  /** Names of GPUs most relevant to this solution */
  relatedGpus: string[];
  /** SEO description */
  seo: string;
}

export const solutions: Solution[] = [
  {
    slug: "model-training",
    group: "Use Case",
    name: "AI Model Training",
    menuDescription: "Train foundation models on dedicated multi-node clusters",
    eyebrow: "Use Case",
    headline: "Train frontier models without sharing the fabric",
    subhead:
      "Multi-node clusters reserved for you alone, with the interconnect distributed training actually needs. No preemption, no spot evictions, nobody else's all-reduce in your fabric.",
    image: "/assets/interconnect-fabric.jpg",
    capabilities: [
      {
        title: "Multi-node NVLink fabric",
        description:
          "Non-blocking XDR InfiniBand at up to 800 Gb/s per GPU, with NVLink inside the rack — gradients keep moving across thousands of GPUs at near-linear scaling efficiency.",
      },
      {
        title: "Reproducible runs",
        description:
          "Dedicated hardware means deterministic performance. Your training curves look the same on run one and run one hundred.",
      },
      {
        title: "Checkpoint-grade storage",
        description:
          "DDN EXAScaler parallel storage with GPUDirect — checkpoints write fast and restore faster, so a failed run costs you minutes, not a day of GPU hours.",
      },
      {
        title: "Reserved capacity",
        description:
          "Your GPUs are yours for the whole campaign, with hot spares standing by — a failed node or a firmware update never stalls the run.",
      },
    ],
    stats: [
      { value: "800 Gb/s", label: "Per-GPU fabric" },
      { value: "0", label: "Spot evictions" },
      { value: "100%", label: "Dedicated hardware" },
    ],
    relatedGpus: ["NVIDIA GB300 NVL72", "NVIDIA GB200 NVL72"],
    seo: "Dedicated multi-node GPU clusters for large-scale AI model training with high-speed NVLink and InfiniBand interconnects.",
  },
  {
    slug: "ai-inference",
    group: "Use Case",
    name: "AI Inference at Scale",
    menuDescription: "Low-latency production serving with guaranteed throughput",
    eyebrow: "Use Case",
    headline: "Production inference with guaranteed latency",
    subhead:
      "Serve production traffic on hardware nobody else can touch — hot spares on standby, throughput that holds at p99, and capacity that scales with a launch instead of buckling under it.",
    image: "/assets/server-dgx.png",
    capabilities: [
      {
        title: "Guaranteed throughput",
        description:
          "Dedicated GPUs mean your tokens-per-second never degrade because another tenant spun up a training job next door.",
      },
      {
        title: "Low-latency serving",
        description:
          "Optimized networking and locally attached NVMe keep time-to-first-token low even under heavy concurrent load.",
      },
      {
        title: "Elastic capacity",
        description:
          "Scale endpoints up for launch spikes and back down afterward, with reserved baseline capacity always available.",
      },
      {
        title: "Bring your own stack",
        description:
          "Run vLLM, TensorRT-LLM, Triton, or your own serving framework — we give you the bare metal, you keep full control.",
      },
    ],
    stats: [
      { value: "N+1", label: "Hot spare nodes" },
      { value: "100%", label: "Dedicated GPUs" },
      { value: "24/7", label: "Expert support" },
    ],
    relatedGpus: ["NVIDIA HGX B300", "NVIDIA H200"],
    seo: "Dedicated GPU infrastructure for low-latency AI inference at scale with guaranteed throughput and hot-spare resilience.",
  },
  {
    slug: "fine-tuning",
    group: "Use Case",
    name: "Fine-Tuning & Post-Training",
    menuDescription: "Adapt and align models on right-sized dedicated nodes",
    eyebrow: "Use Case",
    headline: "Fine-tune and align models on right-sized clusters",
    subhead:
      "From LoRA adapters to full post-training and RLHF — exactly the GPU footprint your job needs, without paying for a hyperscaler's idle overhead.",
    image: "/assets/chip-blackwell.png",
    capabilities: [
      {
        title: "Right-sized footprints",
        description:
          "Spin up anything from a single 8-GPU node to a multi-node cluster, matched precisely to your dataset and method.",
      },
      {
        title: "Fast iteration",
        description:
          "Always-on hardware with no queue between experiments. The time from idea to running job is however long the code takes to write.",
      },
      {
        title: "RLHF & post-training ready",
        description:
          "Interconnect and storage tuned for the read-heavy, multi-stage pipelines that alignment and post-training demand.",
      },
    ],
    stats: [
      { value: "8–512+", label: "GPU footprints" },
      { value: "0", label: "Queue between runs" },
      { value: "Fixed", label: "Monthly pricing" },
    ],
    relatedGpus: ["NVIDIA H200", "NVIDIA H100"],
    seo: "Right-sized dedicated GPU clusters for fine-tuning, RLHF, and post-training of large language models.",
  },
  {
    slug: "healthcare",
    group: "Industry",
    name: "Healthcare & Life Sciences",
    menuDescription: "HIPAA-compliant compute for clinical and research AI",
    eyebrow: "Industry",
    headline: "Private AI compute for clinical environments",
    subhead:
      "HIPAA-compliant, single-tenant GPU infrastructure for medical imaging, drug discovery, and clinical decision support — backed by the NVIDIA Clara stack and built so your compliance team can prove it.",
    image: "/assets/healthcare.jpg",
    capabilities: [
      {
        title: "HIPAA-compliant by design",
        description:
          "Single-tenant deployments with encryption at rest and in transit. The BAA is signed before you finish scoping, not after legal review round three.",
      },
      {
        title: "Optimized for NVIDIA Clara",
        description:
          "Tuned for medical imaging and genomics pipelines built on the NVIDIA Clara healthcare application framework.",
      },
      {
        title: "Reaching 50,000+ clinics",
        description:
          "Distribution relationships across a network of more than 50,000 oncology clinics and medical offices.",
      },
      {
        title: "Audit-ready controls",
        description:
          "SOC 2 Type II controls and detailed access logging give your compliance team the evidence they need.",
      },
    ],
    stats: [
      { value: "HIPAA", label: "Compliant + BAA" },
      { value: "50k+", label: "Clinics in network" },
      { value: "Clara", label: "NVIDIA stack ready" },
    ],
    relatedGpus: ["NVIDIA H200", "NVIDIA H100"],
    seo: "HIPAA-compliant, single-tenant GPU infrastructure for healthcare AI, medical imaging, and life sciences research.",
  },
  {
    slug: "startups",
    group: "Industry",
    name: "Startups & Research",
    menuDescription: "Graduate from on-demand into reserved private clusters",
    eyebrow: "Industry",
    headline: "From your first GPU to your first cluster",
    subhead:
      "Start on on-demand GPUs in hours, then graduate into a reserved private cluster as your workloads grow — with pricing and support built for teams that don't have an infra org yet.",
    image: "/assets/rack-tall.png",
    capabilities: [
      {
        title: "Start on-demand",
        description:
          "Get going in hours with on-demand GPU access, high-speed storage, and caching — no long procurement cycle.",
      },
      {
        title: "Graduate to dedicated",
        description:
          "Move seamlessly into reserved single-tenant clusters as your training and inference needs scale.",
      },
      {
        title: "No infra team required",
        description:
          "We handle provisioning, networking, and operations so your engineers can work on the model, not the metal.",
      },
    ],
    stats: [
      { value: "Hours", label: "To first GPU" },
      { value: "0", label: "Infra hires needed" },
      { value: "Hands-on", label: "Solutions support" },
    ],
    relatedGpus: ["NVIDIA H100", "NVIDIA H200"],
    seo: "Flexible GPU infrastructure for startups and researchers — start on-demand and graduate into dedicated private clusters.",
  },
  {
    slug: "enterprise",
    group: "Industry",
    name: "Enterprise",
    menuDescription: "Private, compliant AI infrastructure for large orgs",
    eyebrow: "Industry",
    headline: "AI infrastructure your security team will sign off on",
    subhead:
      "Isolated GPU infrastructure with the security posture, predictable economics, and direct support that procurement and security reviews actually approve — the first time through.",
    image: "/assets/server-dgx.png",
    capabilities: [
      {
        title: "Full hardware isolation",
        description:
          "Single-tenant servers with private networking. Your workloads never share silicon with another organization.",
      },
      {
        title: "Predictable economics",
        description:
          "Fixed monthly pricing with no surprise egress fees or complex metering — built for annual budgeting.",
      },
      {
        title: "Security & compliance",
        description:
          "SOC 2 Type II and ISO 27001 aligned controls, with dedicated security reviews for your procurement process.",
      },
      {
        title: "Dedicated solutions engineer",
        description:
          "A named engineer who knows your deployment — a phone that rings, not a portal that queues.",
      },
    ],
    stats: [
      { value: "SOC 2", label: "Type II controls" },
      { value: "Fixed", label: "Monthly pricing" },
      { value: "Named", label: "Solutions engineer" },
    ],
    relatedGpus: ["NVIDIA GB300 NVL72", "NVIDIA GB200 NVL72", "NVIDIA HGX B300"],
    seo: "Enterprise-grade single-tenant GPU infrastructure with SOC 2 controls, predictable pricing, and dedicated support.",
  },
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}

export function solutionsByGroup(): Record<SolutionGroup, Solution[]> {
  return {
    "Use Case": solutions.filter((s) => s.group === "Use Case"),
    Industry: solutions.filter((s) => s.group === "Industry"),
  };
}
