const resumeData = {
  name: "Samarth",
  title: "Senior Data Engineer (AWS | Big Data | GenAI)",
  location: "India",
  about:
    "Data Engineering professional with 5+ years of experience architecting scalable AWS and big data solutions that increased processing efficiency by 80% and automated 60% of manual workflows.",
  resumeUrl: "/resume.pdf",
  social: {
    github: "https://github.com/yourhandle",
    linkedin: "https://linkedin.com/in/yourhandle",
    email: "you@example.com",
  },
  skills: [
    { name: "Python", level: 95 },
    { name: "PySpark", level: 92 },
    { name: "AWS (Glue, EMR, Lambda)", level: 90 },
    { name: "Kafka & Kinesis", level: 88 },
    { name: "SQL & Redshift", level: 86 },
  ],
  projects: [
    {
      id: "genai-tdm",
      title: "GenAI Test Data Management",
      description:
        "GenAI-powered test data tooling using LangGraph, Gemini, and Streamlit to generate production-grade datasets for QA.",
      tags: ["GenAI", "LangGraph", "Streamlit"],
    },
    {
      id: "tradelens",
      title: "TradeLens — Real-time Market Analytics",
      description:
        "Real-time analytics platform using Kafka, PySpark, and AWS, enabling low-latency KPIs.",
      tags: ["Kafka", "PySpark", "Streaming", "AWS"],
    },
  ],
  experience: [
    {
      company: "Deloitte USI",
      role: "Senior Data Engineer / Consultant",
      start: "Aug 2024",
      end: "Present",
      bullets: [
        "Built GenAI-powered test data generator using LangGraph + Gemini.",
        "Developed pipelines in Python, PySpark, Hive across Redshift & Hadoop.",
        "Built orchestration: Airflow, Step Functions, Glue.",
        "Designed streaming analytics with Kafka, Kinesis & Spark.",
        "Reduced manual workloads by 60% and operational delays by 80%.",
      ],
    },
    {
      company: "Accenture Solutions Pvt. Ltd.",
      role: "Data Engineering Analyst",
      start: "Oct 2020",
      end: "July 2024",
      bullets: [
        "Developed dynamic ETL using PySpark and Glue (CDC enabled).",
        "Built automation scripts for Glue job & ETL config generation.",
        "Implemented data cleaning using Step Functions + EventBridge.",
        "Delivered stakeholder updates & monthly KT sessions.",
      ],
    },
  ],
  education: [
    {
      school: "L. D. College of Engineering - Ahmedabad",
      degree: "B.E. in Electronics & Communication Engineering",
      date: "Sept 2020",
      notes: "CGPA: 8.91/10",
    },
    {
      school: "Government Polytechnic, Gandhinagar",
      degree: "Diploma in Electronics & Communication Engineering",
      date: "May 2017",
      notes: "CGPA: 9.5/10",
    },
  ],
  certifications: [
    "AWS Certified Data Engineer – Associate (Dec 2024)",
    "AWS Certified Data Analytics – Specialty (Jan 2023)",
    "AWS Developer Associate (May 2022)",
    "SAP Developer Associate – Extension Suite (Mar 2022)",
  ],
  interests: ["Dance", "PC FPS Games", "MotoVlogging"],
}

export default resumeData
