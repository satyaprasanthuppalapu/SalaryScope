import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Briefcase, Calculator, Calendar, Clock, Wrench } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IT Salary Calculator — India 2026" },
      { name: "description", content: "Estimate IT salaries in India by role and experience level." },
    ],
  }),
  component: Index,
});

const L = 100000;

type Role = {
  name: string;
  base: number;
  growth: number;
  demand: number;
  demandLabel: string;
  growthPct: string;
  must: string[];
  good: string[];
  bonus: string[];
};

const roles: Record<string, Role> = {
  fullstack: { name: "Full Stack Developer", base: 4.5*L, growth: 1.8*L, demand: 92, demandLabel: "Very High", growthPct: "18–22%", must: ["HTML","CSS","JavaScript","React","Node.js","SQL","Git","REST APIs"], good: ["TypeScript","Docker","MongoDB","Redis","CI/CD","AWS/GCP"], bonus: ["GraphQL","Kubernetes","System Design","Microservices"] },
  frontend: { name: "Frontend Developer", base: 3.8*L, growth: 1.5*L, demand: 85, demandLabel: "High", growthPct: "15–20%", must: ["HTML5","CSS3","JavaScript (ES6+)","React","Git","Figma","Responsive Design"], good: ["TypeScript","Next.js","Tailwind CSS","Jest","Webpack/Vite","Deployment (Vercel/Netlify)"], bonus: ["Vue.js","Angular","GraphQL","Performance Optimization","Accessibility (a11y)"] },
  backend: { name: "Backend Developer", base: 4.2*L, growth: 1.7*L, demand: 88, demandLabel: "High", growthPct: "16–21%", must: ["Python / Java / Node.js","REST APIs","SQL","Git","Linux Basics","Authentication (JWT/OAuth)"], good: ["Docker","PostgreSQL","MongoDB","Redis","Message Queues (Kafka/RabbitMQ)","Microservices"], bonus: ["Kubernetes","gRPC","System Design","Cloud (AWS/GCP/Azure)"] },
  data_analyst: { name: "Data Analyst", base: 3.5*L, growth: 1.3*L, demand: 80, demandLabel: "High", growthPct: "14–18%", must: ["SQL","Excel","Python (Pandas/NumPy)","Power BI / Tableau","Statistics","Data Cleaning"], good: ["Python (Matplotlib/Seaborn)","Google Analytics","ETL Basics","Storytelling with Data"], bonus: ["R","Looker","BigQuery","Machine Learning basics","Dashboard Automation"] },
  data_scientist: { name: "Data Scientist", base: 6*L, growth: 2.2*L, demand: 90, demandLabel: "Very High", growthPct: "20–25%", must: ["Python","Statistics & Probability","Machine Learning","SQL","Pandas / NumPy","Scikit-learn"], good: ["TensorFlow / PyTorch","Feature Engineering","Model Deployment","Spark","A/B Testing"], bonus: ["Deep Learning","NLP","Computer Vision","MLflow","Cloud ML (SageMaker/Vertex AI)"] },
  devops: { name: "DevOps Engineer", base: 5.5*L, growth: 2*L, demand: 87, demandLabel: "High", growthPct: "18–23%", must: ["Linux","Docker","Git","CI/CD (Jenkins/GitHub Actions)","Shell Scripting","Networking Basics"], good: ["Kubernetes","Terraform","AWS/Azure/GCP","Ansible","Monitoring (Prometheus/Grafana)"], bonus: ["Service Mesh (Istio)","ArgoCD","FinOps","Security (DevSecOps)"] },
  ui_designer: { name: "UI/UX Designer", base: 3.2*L, growth: 1.1*L, demand: 72, demandLabel: "Medium", growthPct: "12–16%", must: ["Figma","Adobe XD","Wireframing","Prototyping","User Research","Visual Design Principles"], good: ["Sketch","HTML/CSS Basics","Usability Testing","Design Systems","Motion Design"], bonus: ["Framer","Webflow","Accessibility Design","No-code Tools","Branding"] },
  web_dev: { name: "Web Developer", base: 3*L, growth: 1*L, demand: 78, demandLabel: "High", growthPct: "12–16%", must: ["HTML","CSS","JavaScript","WordPress / CMS","Git","FTP / Deployment","Responsive Design"], good: ["PHP","MySQL","React basics","SEO Basics","cPanel / Hosting"], bonus: ["Elementor / Gutenberg","E-commerce (WooCommerce)","Performance Optimization"] },
  qa: { name: "QA / Test Engineer", base: 3.2*L, growth: 1*L, demand: 70, demandLabel: "Medium", growthPct: "10–14%", must: ["Manual Testing","Test Case Writing","JIRA","Bug Tracking","SQL Basics","Selenium"], good: ["Python / Java for Automation","Postman (API Testing)","TestNG / JUnit","CI/CD basics"], bonus: ["Performance Testing (JMeter)","Cypress","Mobile Testing","ISTQB Certification"] },
  ml_engineer: { name: "ML Engineer", base: 7*L, growth: 2.5*L, demand: 93, demandLabel: "Very High", growthPct: "22–28%", must: ["Python","ML Algorithms","TensorFlow / PyTorch","SQL","Data Preprocessing","Git"], good: ["MLOps","Docker","Cloud ML (AWS SageMaker)","Feature Stores","Model Monitoring"], bonus: ["LLMs / Transformers","Spark","CUDA / GPU Programming","Kubeflow"] },
  cloud_engineer: { name: "Cloud Engineer", base: 5.8*L, growth: 2.1*L, demand: 89, demandLabel: "Very High", growthPct: "20–25%", must: ["AWS / Azure / GCP","Linux","Networking","Terraform","Docker","IAM & Security"], good: ["Kubernetes","CI/CD","Python / Bash scripting","Cost Optimization","Serverless"], bonus: ["Multi-cloud Architecture","FinOps","Compliance (SOC2/ISO)","Service Mesh"] },
  mobile_dev: { name: "Mobile App Developer", base: 4*L, growth: 1.5*L, demand: 82, demandLabel: "High", growthPct: "15–20%", must: ["React Native / Flutter","JavaScript / Dart","REST APIs","Git","App Store Deployment"], good: ["Native iOS (Swift) / Android (Kotlin)","Push Notifications","Firebase","State Management"], bonus: ["AR/VR","BLE / IoT Integration","Performance Profiling","In-app Purchases"] },
  cybersecurity: { name: "Cybersecurity Analyst", base: 5*L, growth: 1.9*L, demand: 88, demandLabel: "High", growthPct: "18–24%", must: ["Networking (TCP/IP)","Linux","Firewalls & IDS/IPS","SIEM Tools","Vulnerability Assessment","Python basics"], good: ["Penetration Testing","OWASP","Incident Response","Compliance (ISO 27001)","Cloud Security"], bonus: ["Ethical Hacking","Forensics","Red Team / Blue Team","CEH / CISSP Certification"] },
  product_manager: { name: "Product Manager", base: 6.5*L, growth: 2.3*L, demand: 80, demandLabel: "High", growthPct: "18–22%", must: ["Product Roadmapping","Agile / Scrum","JIRA / Confluence","Stakeholder Management","User Research","Data Analysis"], good: ["SQL","Figma basics","A/B Testing","OKR Frameworks","Go-to-market Strategy"], bonus: ["Technical Background","Growth Hacking","PRDs","Customer Journey Mapping"] },
  db_admin: { name: "Database Administrator", base: 4*L, growth: 1.2*L, demand: 68, demandLabel: "Medium", growthPct: "10–14%", must: ["SQL (PostgreSQL / MySQL / Oracle)","Backup & Recovery","Query Optimization","Indexing","Linux","Data Modeling"], good: ["MongoDB","Redis","Replication & Sharding","Performance Tuning","Scripting (Python/Bash)"], bonus: ["Cloud Databases (RDS/Aurora)","Database Security","Big Data (Hadoop)"] },
};

const expMul: Record<string, number> = { fresher: 0, "1": 1, "2": 2.2, "3": 3.5, "4": 5, "5": 7 };
const expLbl: Record<string, string> = { fresher: "Fresher", "1": "1 year", "2": "2 years", "3": "3 years", "4": "4 years", "5": "5+ years" };

const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
const lakhStr = (n: number) => "₹" + (Math.round((n / 100000) * 10) / 10).toFixed(1) + " L";

function Index() {
  const [roleKey, setRoleKey] = useState("");
  const [expKey, setExpKey] = useState("");
  const [submitted, setSubmitted] = useState<{ r: Role; ek: string } | null>(null);
  const year = useMemo(() => new Date().getFullYear(), []);

  const onCalc = () => {
    if (!roleKey || !expKey) return;
    setSubmitted({ r: roles[roleKey], ek: expKey });
  };

  const result = useMemo(() => {
    if (!submitted) return null;
    const { r, ek } = submitted;
    const avg = r.base + r.growth * expMul[ek];
    const lo = avg * 0.85;
    const hi = avg * 1.18;
    return {
      r, ek, avg, lo, hi,
      moAvg: avg / 12, moLo: lo / 12, moHi: hi / 12,
      demandColor: r.demand >= 85 ? "#22c55e" : r.demand >= 75 ? "#eab308" : "#888",
    };
  }, [submitted]);

  const selectCls = "w-full bg-[#1c1c1c] text-[#f5f5f5] border border-[#333] rounded-lg px-4 py-3.5 text-[15px] appearance-none cursor-pointer focus:outline-none focus:border-[#555] bg-no-repeat";
  const selectStyle = {
    backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23a0a0a0' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>")`,
    backgroundPosition: "right 16px center",
    paddingRight: "42px",
  };

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-[#f5f5f5]" style={{ fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Inter,Roboto,sans-serif' }}>
      <div className="max-w-[760px] mx-auto px-5 py-8">
        <h1 className="m-0 mb-1 text-[24px] font-semibold flex items-center flex-wrap gap-2.5">
          <Briefcase className="w-5 h-5" aria-hidden="true" />
          IT salary calculator
          <span className="text-[12px] text-[#a0a0a0] bg-[#262626] px-2.5 py-1 rounded-full font-medium">India · {year}</span>
        </h1>
        <p className="text-[14px] text-[#a0a0a0] mt-0 mb-8">Select your role and experience to see salary in ₹</p>

        <label htmlFor="rs" className="block text-[13px] text-[#a0a0a0] mb-2">Job role</label>
        <select id="rs" className={selectCls + " mb-5"} style={selectStyle} value={roleKey} onChange={(e) => setRoleKey(e.target.value)}>
          <option value="">— choose a role —</option>
          {Object.entries(roles).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
        </select>

        <label htmlFor="es" className="block text-[13px] text-[#a0a0a0] mb-2">Experience level</label>
        <select id="es" className={selectCls + " mb-5"} style={selectStyle} value={expKey} onChange={(e) => setExpKey(e.target.value)}>
          <option value="">— choose experience —</option>
          <option value="fresher">Fresher (0 years)</option>
          <option value="1">1 year</option>
          <option value="2">2 years</option>
          <option value="3">3 years</option>
          <option value="4">4 years</option>
          <option value="5">5+ years</option>
        </select>

        <button
          onClick={onCalc}
          className="w-full bg-transparent border border-[#333] text-[#a0a0a0] rounded-lg px-4 py-3.5 text-[15px] cursor-pointer flex items-center justify-center gap-2 hover:bg-[#1c1c1c] hover:text-[#f5f5f5] transition-colors"
        >
          <Calculator className="w-4 h-4" /> Calculate salary
        </button>

        {result && (
          <div className="bg-[#1c1c1c] border border-[#333] rounded-2xl p-6 mt-6">
            <p className="text-[18px] font-semibold m-0 mb-3.5 flex items-center gap-2 flex-wrap">
              {result.r.name}
              <span className="text-[12px] text-[#a0a0a0] bg-[#2f2f2f] px-2.5 py-0.5 rounded-full font-medium">{expLbl[result.ek]}</span>
            </p>

            <div className="grid grid-cols-2 gap-5 bg-[#262626] rounded-lg px-5 py-4 mb-4">
              <div>
                <p className="text-[11px] text-[#a0a0a0] m-0 mb-1.5 uppercase tracking-wider font-medium flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Yearly (avg)
                </p>
                <p className="text-[26px] font-semibold m-0 mb-1 leading-tight">{lakhStr(result.avg)} / year</p>
                <p className="text-[13px] text-[#a0a0a0] m-0">{lakhStr(result.lo)} – {lakhStr(result.hi)} range</p>
              </div>
              <div>
                <p className="text-[11px] text-[#a0a0a0] m-0 mb-1.5 uppercase tracking-wider font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Monthly (avg)
                </p>
                <p className="text-[26px] font-semibold m-0 mb-1 leading-tight">{inr(result.moAvg)} / mo</p>
                <p className="text-[13px] text-[#a0a0a0] m-0">{inr(result.moLo)} – {inr(result.moHi)} range</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-[#262626] rounded-lg px-4 py-3.5">
                <p className="text-[12px] text-[#a0a0a0] m-0 mb-1.5">Market demand</p>
                <p className="text-[16px] font-semibold m-0">{result.r.demandLabel}</p>
                <div className="h-1.5 bg-[#2f2f2f] rounded-full mt-2.5 overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${result.r.demand}%`, background: result.demandColor }} />
                </div>
              </div>
              <div className="bg-[#262626] rounded-lg px-4 py-3.5">
                <p className="text-[12px] text-[#a0a0a0] m-0 mb-1.5">Salary growth / yr</p>
                <p className="text-[16px] font-semibold m-0">{result.r.growthPct} per year</p>
              </div>
            </div>

            <p className="text-[13px] font-semibold m-0 mb-2.5 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5" /> Required skills
            </p>
            <div className="flex gap-4 mb-3 flex-wrap">
              <span className="text-[12px] text-[#a0a0a0] flex items-center gap-1.5"><span className="w-2 h-2 rounded-full inline-block" style={{ background: "#3b82f6" }} />Must have</span>
              <span className="text-[12px] text-[#a0a0a0] flex items-center gap-1.5"><span className="w-2 h-2 rounded-full inline-block" style={{ background: "#22c55e" }} />Good to have</span>
              <span className="text-[12px] text-[#a0a0a0] flex items-center gap-1.5"><span className="w-2 h-2 rounded-full inline-block" style={{ background: "#888" }} />Bonus</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {result.r.must.map((s) => <span key={s} className="text-[13px] px-3.5 py-1 rounded-full font-medium bg-[#1e3a8a] text-[#93c5fd]">{s}</span>)}
              {result.r.good.map((s) => <span key={s} className="text-[13px] px-3.5 py-1 rounded-full font-medium bg-[#14532d] text-[#86efac]">{s}</span>)}
              {result.r.bonus.map((s) => <span key={s} className="text-[13px] px-3.5 py-1 rounded-full font-medium bg-[#3a3a3a] text-[#d4d4d4]">{s}</span>)}
            </div>

            <p className="text-[12px] text-[#7a7a7a] mt-3.5 leading-relaxed">
              Estimates based on {year} India IT market data. Salaries vary by city (Bengaluru/Hyderabad/Pune pay 15–25% higher), company size, and skillset. Figures are CTC (cost to company).
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
