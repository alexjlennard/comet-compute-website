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
    headline: "Train frontier models on dedicated GPU clusters",
    subhead:
      "Reserve single-tenant multi-node clusters with high-speed interconnects purpose-built for large-scale distributed training. No noisy neighbors, no preemption, no surprises.",
    image: "/assets/interconnect-fabric.jpg",
    capabilities: [
      {
        title: "Multi-node NVLink fabric",
        description:
          "400Gb/s InfiniBand and NVLink connectivity keeps gradients flowing across thousands of GPUs with near-linear scaling efficiency.",
      },
      {
        title: "Reproducible runs",
        description:
          "Dedicated hardware means deterministic performance. Your training curves look the same on run one and run one hundred.",
      },
      {
        title: "Checkpoint-grade storage",
        description:
          "High-throughput parallel storage tiers keep your checkpoints fast to write and fast to restore, minimizing wasted GPU hours.",
      },
      {
        title: "Reserved capacity",
        description:
          "Guaranteed access to the GPUs you need for the full duration of your training campaign — no spot interruptions.",
      },
    ],
    stats: [
      { value: "400Gb/s", label: "Node interconnect" },
      { value: "Near-linear", label: "Scaling efficiency" },
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
      "Deploy inference endpoints on dedicated hardware with contractual latency SLAs, predictable throughput, and capacity that scales with your traffic.",
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
      { value: "99.9%", label: "Uptime SLA" },
      { value: "Dedicated", label: "Serving hardware" },
      { value: "24/7", label: "Expert support" },
    ],
    relatedGpus: ["NVIDIA HGX B300", "NVIDIA H200"],
    seo: "Dedicated GPU infrastructure for low-latency AI inference at scale with guaranteed throughput and uptime SLAs.",
  },
  {
    slug: "fine-tuning",
    group: "Use Case",
    name: "Fine-Tuning & Post-Training",
    menuDescription: "Adapt and align models on right-sized dedicated nodes",
    eyebrow: "Use Case",
    headline: "Fine-tune and align models on right-sized clusters",
    subhead:
      "From LoRA adapters to full post-training and RLHF, get exactly the GPU footprint your job needs — without paying for a hyperscaler's idle overhead.",
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
          "Dedicated, always-on hardware means no queue waits between experiments — iterate on hyperparameters in real time.",
      },
      {
        title: "RLHF & post-training ready",
        description:
          "Interconnect and storage tuned for the read-heavy, multi-stage pipelines that alignment and post-training demand.",
      },
    ],
    stats: [
      { value: "8–512+", label: "GPU footprints" },
      { value: "No queue", label: "Between experiments" },
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
      "HIPAA-compliant, single-tenant GPU infrastructure purpose-built for medical imaging, drug discovery, and clinical decision support — backed by the NVIDIA Clara stack.",
    image: "/assets/healthcare.jpg",
    capabilities: [
      {
        title: "HIPAA-compliant by design",
        description:
          "Single-tenant deployments with encryption at rest and in transit. Business Associate Agreements available before you sign.",
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
    headline: "Compute that grows with your company",
    subhead:
      "Start fast on on-demand GPUs, then graduate into reserved private clusters as your workloads grow — with pricing and support built for teams without a dedicated infra org.",
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
          "We handle provisioning, networking, and operations so your engineers can focus on the model, not the metal.",
      },
    ],
    stats: [
      { value: "Hours", label: "To first GPU" },
      { value: "Flexible", label: "On-demand → reserved" },
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
    headline: "Enterprise-grade private AI infrastructure",
    subhead:
      "Dedicated, isolated GPU infrastructure with the security posture, predictable economics, and dedicated support that enterprise procurement and security teams require.",
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
          "A named engineer who understands your workloads — direct access, not a ticket queue.",
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
