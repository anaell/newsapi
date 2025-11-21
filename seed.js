const mongoose = require("mongoose");
require("dotenv").config();
const News = require("./models/news.model");
const Podcast = require("./models/podcast.model");

const worldNews = [
  {
    id: "world1",
    title: "Global Summit Tackles Climate Crisis",
    shortDescription: "Leaders gather to address urgent climate issues.",
    datePosted: new Date(),
    user: "worlddesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2019/04/10/22/50/climate-4117601_1280.jpg",
    videoUrl: "",
    category: "world",
    slug: "global-summit-climate-crisis",
    content:
      "Delegates from over 100 countries convened in Geneva this week to discuss the escalating climate crisis. The summit focused on reducing carbon emissions, transitioning to renewable energy, and supporting vulnerable nations. Key proposals included a global carbon tax and increased funding for climate adaptation programs. Activists outside the venue called for urgent action, emphasizing the need for accountability and transparency.",
    isTrending: true,
    isLiveUpdate: false,
  },
  {
    id: "world2",
    title: "UN Urges Peace in Conflict Zones",
    shortDescription: "Calls for ceasefire in war-torn regions.",
    datePosted: new Date(),
    user: "worlddesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/03/53/peace-1863901_1280.jpg",
    videoUrl: "",
    category: "world",
    slug: "un-peace-conflict-zones",
    content:
      "The United Nations has issued a renewed call for ceasefires in multiple conflict zones, including regions in the Middle East and Sub-Saharan Africa. Secretary-General António Guterres emphasized the humanitarian toll of ongoing violence and urged all parties to engage in diplomatic dialogue. The UN is deploying additional peacekeeping forces and coordinating with NGOs to deliver aid to displaced populations.",
    isTrending: false,
    isLiveUpdate: true,
  },
  {
    id: "world3",
    title: "International Aid Reaches Flood Victims",
    shortDescription: "Relief efforts ramp up in affected areas.",
    datePosted: new Date(),
    user: "worlddesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2017/08/30/07/52/flood-2699858_1280.jpg",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    category: "world",
    slug: "aid-flood-victims",
    content:
      "Following devastating floods in Southeast Asia, international aid organizations have mobilized to provide food, clean water, and medical supplies to affected communities. The Red Cross and UNICEF are among the groups leading the response, with support from local governments. Temporary shelters have been set up, and efforts are underway to restore infrastructure and prevent disease outbreaks.",
    isTrending: true,
    isLiveUpdate: true,
  },
  {
    id: "world4",
    title: "World Leaders Meet for Trade Talks",
    shortDescription: "Negotiations begin on global trade policies.",
    datePosted: new Date(),
    user: "worlddesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/03/53/business-1863880_1280.jpg",
    videoUrl: "",
    category: "world",
    slug: "leaders-trade-talks",
    content:
      "Top officials from the G20 nations have gathered in Brussels to negotiate new trade agreements aimed at reducing tariffs and boosting international commerce. The talks come amid rising concerns over protectionism and supply chain disruptions. Delegates are expected to address digital trade, agricultural exports, and fair labor practices. Analysts predict a mixed outcome, with some deals likely to be delayed.",
    isTrending: false,
    isLiveUpdate: false,
  },
  {
    id: "world5",
    title: "Earthquake Shakes Southeast Asia",
    shortDescription: "Magnitude 6.8 quake causes damage.",
    datePosted: new Date(),
    user: "worlddesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2017/01/06/19/15/earth-1956416_1280.jpg",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    category: "world",
    slug: "earthquake-southeast-asia",
    content:
      "A powerful earthquake struck the region early Tuesday morning, causing widespread damage to buildings and infrastructure. Emergency services are working around the clock to rescue trapped individuals and provide medical care. The government has declared a state of emergency and requested international assistance. Seismologists warn of potential aftershocks in the coming days.",
    isTrending: true,
    isLiveUpdate: true,
  },
  {
    id: "world6",
    title: "Global Vaccination Efforts Expand",
    shortDescription: "New shipments reach developing nations.",
    datePosted: new Date(),
    user: "worlddesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2021/01/22/10/47/vaccine-5938721_1280.jpg",
    videoUrl: "",
    category: "world",
    slug: "vaccination-efforts-expand",
    content:
      "The World Health Organization has announced the delivery of millions of vaccine doses to underserved regions. This marks a significant milestone in the global fight against infectious diseases. Mobile clinics have been deployed to remote areas, and public awareness campaigns are underway to encourage participation. Health officials stress the importance of continued funding and international cooperation.",
    isTrending: false,
    isLiveUpdate: true,
  },
  {
    id: "world7",
    title: "Refugee Crisis Deepens in Europe",
    shortDescription: "Thousands displaced amid border tensions.",
    datePosted: new Date(),
    user: "worlddesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/05/08/refugees-1867121_1280.jpg",
    videoUrl: "",
    category: "world",
    slug: "refugee-crisis-europe",
    content:
      "Border crossings in Eastern Europe have seen a dramatic increase in refugee arrivals, prompting concerns over humanitarian conditions. Camps are overcrowded, and resources are stretched thin. European leaders are meeting to discuss coordinated responses, including resettlement programs and increased funding for aid organizations. Advocacy groups are calling for more humane policies and faster asylum processing.",
    isTrending: true,
    isLiveUpdate: false,
  },
  {
    id: "world8",
    title: "Arctic Ice Levels Hit Record Low",
    shortDescription: "Scientists warn of environmental impact.",
    datePosted: new Date(),
    user: "worlddesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2017/01/06/19/15/arctic-1956416_1280.jpg",
    videoUrl: "",
    category: "world",
    slug: "arctic-ice-record-low",
    content:
      "New satellite data reveals that Arctic sea ice has reached its lowest level in recorded history. Climate scientists attribute the decline to rising global temperatures and increased greenhouse gas emissions. The loss of ice threatens marine ecosystems and accelerates global warming. Environmental groups are urging governments to take immediate action to curb emissions and protect polar habitats.",
    isTrending: false,
    isLiveUpdate: false,
  },
  {
    id: "world9",
    title: "International Space Station Celebrates 25 Years",
    shortDescription: "Milestone for global space collaboration.",
    datePosted: new Date(),
    user: "worlddesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2017/01/06/19/15/space-1956416_1280.jpg",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    category: "world",
    slug: "iss-25-years",
    content:
      "The International Space Station marks its 25th anniversary with a series of commemorative events and scientific presentations. Astronauts from multiple countries shared their experiences and highlighted key research achievements. The ISS has played a crucial role in advancing space medicine, materials science, and international cooperation. Plans for future missions and upgrades are already underway.",
    isTrending: true,
    isLiveUpdate: false,
  },
  {
    id: "world10",
    title: "Global Literacy Rates Improve",
    shortDescription: "UNESCO reports progress in education.",
    datePosted: new Date(),
    user: "worlddesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/03/53/education-1863880_1280.jpg",
    videoUrl: "",
    category: "world",
    slug: "literacy-rates-improve",
    content:
      "UNESCO's latest report shows a steady increase in global literacy rates, particularly among young women in developing countries. Education initiatives, teacher training programs, and digital learning platforms have contributed to the progress. However, challenges remain in conflict zones and rural areas. The organization calls for sustained investment and policy reforms to ensure equitable access to education.",
    isTrending: false,
    isLiveUpdate: true,
  },
];

const politicsNews = [
  {
    id: "politics1",
    title: "Parliament Debates New Tax Bill",
    shortDescription: "Lawmakers clash over proposed tax reforms.",
    datePosted: new Date(),
    user: "politicsdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/03/53/parliament-1863880_1280.jpg",
    videoUrl: "",
    category: "politics",
    slug: "parliament-debates-tax-bill",
    content:
      "The national parliament convened today to debate a controversial new tax bill aimed at restructuring income brackets and corporate levies. Supporters argue the bill will stimulate economic growth and reduce inequality, while critics warn it could burden small businesses. The session was marked by heated exchanges and public protests outside the building.",
    isTrending: true,
    isLiveUpdate: false,
  },
  {
    id: "politics2",
    title: "President Signs Healthcare Reform",
    shortDescription: "New law expands access to medical services.",
    datePosted: new Date(),
    user: "politicsdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2017/01/06/19/15/healthcare-1956416_1280.jpg",
    videoUrl: "",
    category: "politics",
    slug: "president-signs-healthcare-reform",
    content:
      "In a landmark move, the president signed a sweeping healthcare reform bill into law today. The legislation expands coverage to millions of uninsured citizens and introduces price caps on essential medications. Health advocates praised the bill, while opposition leaders criticized its funding model and implementation timeline.",
    isTrending: false,
    isLiveUpdate: true,
  },
  {
    id: "politics3",
    title: "Election Campaigns Heat Up Nationwide",
    shortDescription: "Candidates ramp up efforts ahead of vote.",
    datePosted: new Date(),
    user: "politicsdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/03/53/election-1863880_1280.jpg",
    videoUrl: "",
    category: "politics",
    slug: "election-campaigns-heat-up",
    content:
      "With elections just weeks away, political parties are intensifying their campaigns across the country. Rallies, debates, and media appearances have become daily fixtures. Analysts note a shift in voter sentiment, with younger demographics showing increased engagement. Security forces are on high alert to ensure peaceful proceedings.",
    isTrending: true,
    isLiveUpdate: true,
  },
  {
    id: "politics4",
    title: "Political Scandal Rocks Local Government",
    shortDescription: "Officials accused of misusing public funds.",
    datePosted: new Date(),
    user: "politicsdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/03/53/scandal-1863880_1280.jpg",
    videoUrl: "",
    category: "politics",
    slug: "political-scandal-local-government",
    content:
      "A major scandal has erupted in the city council after whistleblowers revealed alleged misuse of public funds. Investigations are underway, and several officials have been suspended pending inquiry. Citizens have taken to the streets demanding accountability and transparency. The mayor has promised full cooperation with law enforcement.",
    isTrending: true,
    isLiveUpdate: false,
  },
  {
    id: "politics5",
    title: "Senate Approves Defense Budget",
    shortDescription: "Military spending gets green light.",
    datePosted: new Date(),
    user: "politicsdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/03/53/defense-1863880_1280.jpg",
    videoUrl: "",
    category: "politics",
    slug: "senate-approves-defense-budget",
    content:
      "The Senate has passed a $700 billion defense budget, allocating funds for modernization of equipment, cybersecurity initiatives, and troop welfare. The bill received bipartisan support, though some lawmakers raised concerns about transparency and oversight. Defense officials welcomed the move, citing urgent needs in strategic regions.",
    isTrending: false,
    isLiveUpdate: true,
  },
  {
    id: "politics6",
    title: "New Immigration Policy Announced",
    shortDescription: "Government outlines new visa rules.",
    datePosted: new Date(),
    user: "politicsdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/03/53/immigration-1863880_1280.jpg",
    videoUrl: "",
    category: "politics",
    slug: "new-immigration-policy",
    content:
      "The Ministry of Interior has unveiled a new immigration policy aimed at streamlining visa applications and enhancing border security. The policy introduces digital processing systems and expands work visa categories. Advocacy groups have expressed mixed reactions, urging the government to ensure fairness and human rights protections.",
    isTrending: false,
    isLiveUpdate: false,
  },
  {
    id: "politics7",
    title: "Protesters Rally for Electoral Reform",
    shortDescription: "Demonstrators demand fair voting practices.",
    datePosted: new Date(),
    user: "politicsdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/03/53/protest-1863880_1280.jpg",
    videoUrl: "",
    category: "politics",
    slug: "protesters-rally-electoral-reform",
    content:
      "Thousands of citizens gathered in the capital today to demand reforms in the electoral process. Protesters called for transparent vote counting, independent oversight, and updated voter registration systems. The demonstration remained peaceful, with organizers vowing to continue advocacy until legislative changes are enacted.",
    isTrending: true,
    isLiveUpdate: true,
  },
  {
    id: "politics8",
    title: "Governor Faces Ethics Investigation",
    shortDescription: "Allegations of misconduct surface.",
    datePosted: new Date(),
    user: "politicsdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/03/53/governor-1863880_1280.jpg",
    videoUrl: "",
    category: "politics",
    slug: "governor-ethics-investigation",
    content:
      "The state ethics commission has launched an investigation into the governor following allegations of conflict of interest and misuse of office. The governor denies any wrongdoing and has pledged to cooperate fully. Political analysts say the outcome could impact upcoming elections and party dynamics.",
    isTrending: false,
    isLiveUpdate: false,
  },
  {
    id: "politics9",
    title: "Political Parties Clash Over Education",
    shortDescription: "Debate intensifies on school funding.",
    datePosted: new Date(),
    user: "politicsdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/03/53/education-1863880_1280.jpg",
    videoUrl: "",
    category: "politics",
    slug: "parties-clash-education",
    content:
      "Education policy has become a flashpoint in national politics, with parties divided over funding models and curriculum standards. The ruling party advocates for increased investment in STEM fields, while opposition leaders call for broader reforms. Teachers' unions have entered the fray, demanding better pay and resources.",
    isTrending: true,
    isLiveUpdate: false,
  },
  {
    id: "politics10",
    title: "Supreme Court Hears Landmark Case",
    shortDescription: "Judges deliberate on constitutional challenge.",
    datePosted: new Date(),
    user: "politicsdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/03/53/court-1863880_1280.jpg",
    videoUrl: "",
    category: "politics",
    slug: "supreme-court-landmark-case",
    content:
      "The Supreme Court began hearings today on a case that could redefine constitutional limits on executive power. Legal experts say the outcome may set a precedent for future governance. The courtroom was packed with observers, and the justices posed pointed questions to both sides. A ruling is expected within weeks.",
    isTrending: false,
    isLiveUpdate: true,
  },
];

const businessNews = [
  {
    id: "business1",
    title: "Tech Stocks Lead Market Surge",
    shortDescription: "NASDAQ sees record highs amid investor optimism.",
    datePosted: new Date(),
    user: "bizdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2015/05/31/12/14/stock-791322_1280.jpg",
    videoUrl: "",
    category: "business",
    slug: "tech-stocks-market-surge",
    content:
      "Technology companies posted strong quarterly earnings, driving a surge in stock prices across major indices. Investors responded positively to growth in cloud computing and AI sectors. Analysts caution that while the rally is promising, market volatility remains a concern due to global economic uncertainties.",
    isTrending: true,
    isLiveUpdate: false,
  },
  {
    id: "business2",
    title: "Startup Raises $50M in Series B",
    shortDescription: "Fintech firm secures major funding round.",
    datePosted: new Date(),
    user: "bizdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/03/53/startup-1863880_1280.jpg",
    videoUrl: "",
    category: "business",
    slug: "startup-raises-series-b",
    content:
      "A rising fintech startup has closed a $50 million Series B funding round led by global venture capital firms. The company plans to expand its mobile payment platform across Africa and Asia. Founders say the funds will also support hiring and product development.",
    isTrending: false,
    isLiveUpdate: true,
  },
  {
    id: "business3",
    title: "Inflation Slows in Q3 Report",
    shortDescription: "Consumer prices stabilize after months of spikes.",
    datePosted: new Date(),
    user: "bizdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/03/53/inflation-1863880_1280.jpg",
    videoUrl: "",
    category: "business",
    slug: "inflation-slows-q3",
    content:
      "The latest economic report shows a slowdown in inflation, with consumer prices rising at a more moderate pace. Economists attribute the change to falling fuel costs and improved supply chains. Central banks are expected to hold interest rates steady for the next quarter.",
    isTrending: false,
    isLiveUpdate: false,
  },
  {
    id: "business4",
    title: "Retail Giants Announce Merger",
    shortDescription: "Two major brands join forces to expand reach.",
    datePosted: new Date(),
    user: "bizdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/03/53/retail-1863880_1280.jpg",
    videoUrl: "",
    category: "business",
    slug: "retail-giants-merger",
    content:
      "In a strategic move, two leading retail chains have announced a merger valued at $12 billion. The deal aims to consolidate operations, reduce costs, and enhance customer experience through shared logistics and digital platforms. Regulatory approval is pending.",
    isTrending: true,
    isLiveUpdate: true,
  },
  {
    id: "business5",
    title: "Cryptocurrency Market Rebounds",
    shortDescription: "Bitcoin and Ethereum show signs of recovery.",
    datePosted: new Date(),
    user: "bizdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2018/01/18/07/01/bitcoin-3089728_1280.jpg",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    category: "business",
    slug: "crypto-market-rebounds",
    content:
      "After months of decline, the cryptocurrency market is showing signs of recovery. Bitcoin rose 8% this week, while Ethereum gained 5%. Analysts cite increased institutional interest and regulatory clarity as key drivers. However, volatility remains high and investors are urged to proceed cautiously.",
    isTrending: true,
    isLiveUpdate: false,
  },
  {
    id: "business6",
    title: "Oil Prices Drop Amid Global Tensions",
    shortDescription: "Energy markets react to geopolitical shifts.",
    datePosted: new Date(),
    user: "bizdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/03/53/oil-1863880_1280.jpg",
    videoUrl: "",
    category: "business",
    slug: "oil-prices-drop",
    content:
      "Crude oil prices fell sharply this week following diplomatic tensions in the Middle East. Traders are concerned about supply disruptions and shifting alliances. Energy companies are adjusting forecasts, and governments are reviewing strategic reserves to stabilize markets.",
    isTrending: false,
    isLiveUpdate: true,
  },
  {
    id: "business7",
    title: "CEO Resigns After Profit Slump",
    shortDescription: "Leadership shakeup at major tech firm.",
    datePosted: new Date(),
    user: "bizdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/03/53/ceo-1863880_1280.jpg",
    videoUrl: "",
    category: "business",
    slug: "ceo-resigns-profit-slump",
    content:
      "The CEO of a leading tech company has stepped down following a disappointing earnings report. The board cited the need for fresh leadership to navigate market challenges. An interim CEO has been appointed, and a global search for a permanent replacement is underway.",
    isTrending: true,
    isLiveUpdate: false,
  },
  {
    id: "business8",
    title: "E-commerce Growth Hits New High",
    shortDescription: "Online shopping continues upward trend.",
    datePosted: new Date(),
    user: "bizdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/03/53/ecommerce-1863880_1280.jpg",
    videoUrl: "",
    category: "business",
    slug: "ecommerce-growth-high",
    content:
      "E-commerce sales have reached record levels this quarter, driven by mobile shopping and fast delivery options. Retailers are investing heavily in digital infrastructure and AI-powered recommendations. Experts predict continued growth, especially in emerging markets.",
    isTrending: false,
    isLiveUpdate: true,
  },
  {
    id: "business9",
    title: "Banks Tighten Lending Rules",
    shortDescription: "New policies affect small business loans.",
    datePosted: new Date(),
    user: "bizdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/03/53/bank-1863880_1280.jpg",
    videoUrl: "",
    category: "business",
    slug: "banks-tighten-lending",
    content:
      "Major banks have introduced stricter lending criteria in response to rising default rates. Small business owners report difficulty accessing capital, prompting calls for government intervention. Financial institutions defend the move as necessary for long-term stability.",
    isTrending: false,
    isLiveUpdate: false,
  },
  {
    id: "business10",
    title: "Real Estate Market Shows Signs of Recovery",
    shortDescription: "Home sales rebound in urban centers.",
    datePosted: new Date(),
    user: "bizdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/03/53/real-estate-1863880_1280.jpg",
    videoUrl: "",
    category: "business",
    slug: "real-estate-recovery",
    content:
      "Urban housing markets are bouncing back after a prolonged slump. Real estate agents report increased buyer interest and rising prices in key cities. Factors include lower mortgage rates and renewed demand for city living. Developers are cautiously optimistic about future growth.",
    isTrending: true,
    isLiveUpdate: true,
  },
];

const technologyNews = [
  {
    id: "tech1",
    title: "AI Breakthrough in Medical Diagnosis",
    shortDescription: "New algorithm detects rare diseases with high accuracy.",
    datePosted: new Date(),
    user: "techdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2020/04/07/15/20/artificial-intelligence-5018228_1280.jpg",
    videoUrl: "",
    category: "technology",
    slug: "ai-breakthrough-medical-diagnosis",
    content:
      "Researchers have developed an AI model capable of diagnosing rare diseases from medical imaging with over 95% accuracy. The system uses deep learning to analyze patterns that often go unnoticed by human doctors. Hospitals are beginning pilot programs to integrate the technology into routine screenings.",
    isTrending: true,
    isLiveUpdate: false,
  },
  {
    id: "tech2",
    title: "New Smartphone Features Foldable Display",
    shortDescription: "Tech giant unveils next-gen mobile device.",
    datePosted: new Date(),
    user: "techdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2020/06/12/17/02/smartphone-5286071_1280.jpg",
    videoUrl: "",
    category: "technology",
    slug: "smartphone-foldable-display",
    content:
      "The latest smartphone from a leading manufacturer features a foldable OLED display, allowing users to switch between phone and tablet modes seamlessly. The device also includes upgraded cameras, faster processors, and improved battery life. Pre-orders have already exceeded expectations.",
    isTrending: false,
    isLiveUpdate: true,
  },
  {
    id: "tech3",
    title: "Cybersecurity Firm Warns of New Threat",
    shortDescription: "Hackers target cloud infrastructure.",
    datePosted: new Date(),
    user: "techdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2020/04/23/18/32/cyber-security-5081990_1280.jpg",
    videoUrl: "",
    category: "technology",
    slug: "cybersecurity-new-threat",
    content:
      "A major cybersecurity firm has issued a warning about a new malware strain targeting cloud-based systems. The attack vector exploits vulnerabilities in outdated APIs and has already affected several large enterprises. Experts recommend immediate updates and enhanced monitoring.",
    isTrending: true,
    isLiveUpdate: true,
  },
  {
    id: "tech4",
    title: "Social Media Platform Launches Update",
    shortDescription: "New features aim to boost user engagement.",
    datePosted: new Date(),
    user: "techdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2017/01/06/19/15/social-media-1956416_1280.jpg",
    videoUrl: "",
    category: "technology",
    slug: "social-media-platform-update",
    content:
      "A popular social media app has rolled out a major update introducing live audio rooms, enhanced privacy controls, and AI-powered content moderation. The company says the changes are based on user feedback and aim to create a safer, more interactive experience.",
    isTrending: false,
    isLiveUpdate: false,
  },
  {
    id: "tech5",
    title: "Quantum Computing Inches Closer to Reality",
    shortDescription:
      "New chip design shows promise for scalable quantum systems.",
    datePosted: new Date(),
    user: "techdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2020/04/07/15/20/quantum-5018227_1280.jpg",
    videoUrl: "",
    category: "technology",
    slug: "quantum-computing-chip-design",
    content:
      "Scientists have unveiled a new quantum chip architecture that could pave the way for scalable quantum computers. The design improves coherence times and reduces error rates, addressing two major hurdles in the field. Industry leaders are watching closely as prototypes enter testing.",
    isTrending: true,
    isLiveUpdate: false,
  },
  {
    id: "tech6",
    title: "Tech Conference Highlights Innovation",
    shortDescription: "Startups showcase cutting-edge solutions.",
    datePosted: new Date(),
    user: "techdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/03/53/conference-1863880_1280.jpg",
    videoUrl: "",
    category: "technology",
    slug: "tech-conference-innovation",
    content:
      "The annual Global Tech Conference kicked off this week with hundreds of startups presenting innovations in AI, robotics, and green tech. Keynote speakers included industry veterans and venture capitalists. Attendees praised the event for fostering collaboration and investment opportunities.",
    isTrending: false,
    isLiveUpdate: true,
  },
  {
    id: "tech7",
    title: "VR Headsets Gain Popularity",
    shortDescription: "Virtual reality sees surge in consumer adoption.",
    datePosted: new Date(),
    user: "techdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2017/01/06/19/15/vr-1956416_1280.jpg",
    videoUrl: "",
    category: "technology",
    slug: "vr-headsets-popularity",
    content:
      "Sales of VR headsets have increased by 40% year-over-year, driven by new gaming titles and immersive educational content. Manufacturers are racing to improve resolution and reduce latency. Experts believe VR could become mainstream in classrooms and workplaces within the next five years.",
    isTrending: true,
    isLiveUpdate: false,
  },
  {
    id: "tech8",
    title: "Electric Vehicles Dominate Auto Show",
    shortDescription: "EVs take center stage at international expo.",
    datePosted: new Date(),
    user: "techdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2018/03/04/17/35/electric-car-3199494_1280.jpg",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    category: "technology",
    slug: "electric-vehicles-auto-show",
    content:
      "Electric vehicles were the highlight of this year's International Auto Expo, with major brands unveiling new models featuring extended range and autonomous capabilities. Attendees praised the sleek designs and eco-friendly features. Analysts say EV adoption is accelerating globally.",
    isTrending: false,
    isLiveUpdate: true,
  },
  {
    id: "tech9",
    title: "Cloud Storage Gets Faster and Cheaper",
    shortDescription: "Providers slash prices and boost performance.",
    datePosted: new Date(),
    user: "techdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2017/01/06/19/15/cloud-1956416_1280.jpg",
    videoUrl: "",
    category: "technology",
    slug: "cloud-storage-improvements",
    content:
      "Cloud storage providers have announced major upgrades to their platforms, offering faster upload speeds and reduced pricing tiers. The move is expected to benefit small businesses and individual users alike. New security features have also been added to protect sensitive data.",
    isTrending: false,
    isLiveUpdate: false,
  },
  {
    id: "tech10",
    title: "Robotics Startup Unveils Humanoid Assistant",
    shortDescription: "AI-powered robot designed for home and office use.",
    datePosted: new Date(),
    user: "techdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2020/04/07/15/20/robot-5018229_1280.jpg",
    videoUrl: "",
    category: "technology",
    slug: "robotics-humanoid-assistant",
    content:
      "A robotics startup has introduced a humanoid assistant capable of performing household tasks, answering questions, and interacting with users in natural language. The robot uses advanced AI and sensor technology to navigate environments and respond to voice commands. Beta testing begins next month.",
    isTrending: true,
    isLiveUpdate: false,
  },
];

const healthNews = [
  {
    id: "health1",
    title: "New Study Links Diet to Mental Health",
    shortDescription:
      "Researchers find strong connection between nutrition and mood.",
    datePosted: new Date(),
    user: "healthdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2017/01/06/19/15/healthy-food-1956416_1280.jpg",
    videoUrl: "",
    category: "health",
    slug: "diet-mental-health-study",
    content:
      "A new peer-reviewed study has found that diets rich in fruits, vegetables, and omega-3 fatty acids are associated with lower rates of depression and anxiety. Researchers analyzed data from over 10,000 participants and emphasized the importance of holistic approaches to mental wellness. Nutritionists are calling for dietary guidelines to include mental health considerations.",
    isTrending: true,
    isLiveUpdate: false,
  },
  {
    id: "health2",
    title: "Hospitals Prepare for Flu Season",
    shortDescription: "Medical centers ramp up vaccination and staffing.",
    datePosted: new Date(),
    user: "healthdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2017/01/06/19/15/hospital-1956416_1280.jpg",
    videoUrl: "",
    category: "health",
    slug: "hospitals-flu-season-prep",
    content:
      "Hospitals across the country are preparing for an expected surge in flu cases by increasing vaccine availability, hiring temporary staff, and expanding ICU capacity. Health officials are urging the public to get vaccinated early and practice good hygiene. The CDC has released updated flu strain forecasts for the season.",
    isTrending: false,
    isLiveUpdate: true,
  },
  {
    id: "health3",
    title: "Breakthrough in Cancer Research",
    shortDescription: "New treatment shows promise in early trials.",
    datePosted: new Date(),
    user: "healthdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2017/01/06/19/15/cancer-research-1956416_1280.jpg",
    videoUrl: "",
    category: "health",
    slug: "cancer-research-breakthrough",
    content:
      "Scientists have developed a new immunotherapy treatment that targets cancer cells without harming healthy tissue. Early clinical trials show a 70% success rate in reducing tumor size. The treatment is expected to enter Phase III trials next year and could revolutionize oncology care.",
    isTrending: true,
    isLiveUpdate: false,
  },
  {
    id: "health4",
    title: "Mental Health Awareness Campaign Launches",
    shortDescription: "Nationwide initiative aims to reduce stigma.",
    datePosted: new Date(),
    user: "healthdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2017/01/06/19/15/mental-health-1956416_1280.jpg",
    videoUrl: "",
    category: "health",
    slug: "mental-health-awareness-campaign",
    content:
      "A new public awareness campaign has launched to promote mental health education and reduce stigma. The initiative includes school programs, workplace training, and national media outreach. Mental health advocates hope the campaign will encourage more people to seek help and normalize conversations around emotional well-being.",
    isTrending: false,
    isLiveUpdate: true,
  },
  {
    id: "health5",
    title: "Vaccine Rollout Expands to Rural Areas",
    shortDescription: "Mobile clinics reach underserved communities.",
    datePosted: new Date(),
    user: "healthdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2021/01/22/10/47/vaccine-5938721_1280.jpg",
    videoUrl: "",
    category: "health",
    slug: "vaccine-rollout-rural-areas",
    content:
      "Health departments have deployed mobile vaccination units to rural and remote areas, aiming to close the gap in immunization rates. The effort includes partnerships with local leaders and community health workers. Early reports show increased turnout and positive reception from residents.",
    isTrending: true,
    isLiveUpdate: true,
  },
  {
    id: "health6",
    title: "Doctors Warn of Antibiotic Resistance",
    shortDescription: "Overuse of antibiotics poses global threat.",
    datePosted: new Date(),
    user: "healthdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2017/01/06/19/15/antibiotics-1956416_1280.jpg",
    videoUrl: "",
    category: "health",
    slug: "antibiotic-resistance-warning",
    content:
      "Medical professionals are raising alarms about the growing threat of antibiotic-resistant bacteria. A new report shows that misuse of antibiotics in both humans and livestock is accelerating resistance. The WHO is calling for stricter regulations and increased public education on proper antibiotic use.",
    isTrending: false,
    isLiveUpdate: false,
  },
  {
    id: "health7",
    title: "Fitness Trends Shift Toward Mindfulness",
    shortDescription: "Yoga and meditation gain popularity.",
    datePosted: new Date(),
    user: "healthdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2017/01/06/19/15/yoga-1956416_1280.jpg",
    videoUrl: "",
    category: "health",
    slug: "fitness-trends-mindfulness",
    content:
      "Fitness enthusiasts are increasingly turning to mindfulness-based practices like yoga, tai chi, and guided meditation. Experts say the shift reflects a growing awareness of mental health and stress management. Gyms and wellness centers are expanding their offerings to include holistic programs.",
    isTrending: true,
    isLiveUpdate: false,
  },
  {
    id: "health8",
    title: "Health Apps Gain Popularity",
    shortDescription: "Mobile tools help users track wellness goals.",
    datePosted: new Date(),
    user: "healthdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2017/01/06/19/15/health-app-1956416_1280.jpg",
    videoUrl: "",
    category: "health",
    slug: "health-apps-popularity",
    content:
      "Downloads of health and fitness apps have surged, with users tracking everything from sleep patterns to hydration. Developers are incorporating AI to personalize recommendations and improve user engagement. Healthcare providers are also beginning to integrate app data into patient care.",
    isTrending: false,
    isLiveUpdate: true,
  },
  {
    id: "health9",
    title: "Nutrition Guidelines Updated",
    shortDescription: "Experts revise daily intake recommendations.",
    datePosted: new Date(),
    user: "healthdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2017/01/06/19/15/nutrition-1956416_1280.jpg",
    videoUrl: "",
    category: "health",
    slug: "nutrition-guidelines-updated",
    content:
      "The national health board has released updated dietary guidelines, emphasizing plant-based foods, reduced sugar intake, and portion control. The changes are based on recent research linking diet to chronic disease prevention. Nutritionists are working to translate the guidelines into practical meal plans.",
    isTrending: false,
    isLiveUpdate: false,
  },
  {
    id: "health10",
    title: "Telemedicine Use Surges Post-Pandemic",
    shortDescription: "Virtual care becomes a healthcare staple.",
    datePosted: new Date(),
    user: "healthdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2020/03/26/09/41/telemedicine-4960257_1280.jpg",
    videoUrl: "",
    category: "health",
    slug: "telemedicine-post-pandemic",
    content:
      "Telemedicine appointments have increased dramatically since the pandemic, with patients and providers embracing the convenience of virtual care. Insurance companies are expanding coverage, and new platforms are emerging to meet demand. Experts say telehealth is here to stay, especially for routine consultations and mental health services.",
    isTrending: true,
    isLiveUpdate: true,
  },
];

const sportsNews = [
  {
    id: "sports1",
    title: "Local Team Wins Championship",
    shortDescription: "Underdogs clinch victory in dramatic final.",
    datePosted: new Date(),
    user: "sportsdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/03/53/soccer-1863880_1280.jpg",
    videoUrl: "",
    category: "sports",
    slug: "local-team-wins-championship",
    content:
      "In a thrilling match that kept fans on the edge of their seats, the local football team secured the championship title with a last-minute goal. The victory marks their first major win in over a decade. Celebrations erupted across the city, with players dedicating the win to their loyal supporters.",
    isTrending: true,
    isLiveUpdate: false,
  },
  {
    id: "sports2",
    title: "Olympic Committee Announces Host City",
    shortDescription: "New location selected for upcoming games.",
    datePosted: new Date(),
    user: "sportsdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/03/53/olympics-1863880_1280.jpg",
    videoUrl: "",
    category: "sports",
    slug: "olympic-committee-host-city",
    content:
      "The International Olympic Committee has officially named Cape Town as the host city for the 2032 Summer Games. The decision follows months of deliberation and site inspections. Organizers promise sustainable infrastructure and inclusive participation. Athletes and fans worldwide are already expressing excitement.",
    isTrending: false,
    isLiveUpdate: true,
  },
  {
    id: "sports3",
    title: "Star Athlete Breaks World Record",
    shortDescription: "Track and field history rewritten.",
    datePosted: new Date(),
    user: "sportsdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/03/53/track-1863880_1280.jpg",
    videoUrl: "",
    category: "sports",
    slug: "star-athlete-world-record",
    content:
      "During the international athletics meet, sprinter Amina Okoro shattered the 400m world record with a time of 47.89 seconds. The crowd erupted in applause as she crossed the finish line. Experts hailed the performance as one of the greatest in modern track history.",
    isTrending: true,
    isLiveUpdate: true,
  },
  {
    id: "sports4",
    title: "Football League Kicks Off New Season",
    shortDescription: "Teams gear up for competitive fixtures.",
    datePosted: new Date(),
    user: "sportsdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/03/53/football-1863880_1280.jpg",
    videoUrl: "",
    category: "sports",
    slug: "football-league-new-season",
    content:
      "The national football league began its new season this weekend with packed stadiums and high-energy matches. Coaches unveiled new strategies, and fans welcomed fresh talent. Analysts predict a closely contested season with several teams showing championship potential.",
    isTrending: false,
    isLiveUpdate: false,
  },
  {
    id: "sports5",
    title: "Tennis Legend Announces Retirement",
    shortDescription: "Farewell tour planned for final season.",
    datePosted: new Date(),
    user: "sportsdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/03/53/tennis-1863880_1280.jpg",
    videoUrl: "",
    category: "sports",
    slug: "tennis-legend-retirement",
    content:
      "After a career spanning two decades, tennis icon Rafael Mendez has announced his retirement. He plans a farewell tour across major tournaments before stepping away from professional play. Fans and fellow athletes have shared tributes, celebrating his legacy and sportsmanship.",
    isTrending: true,
    isLiveUpdate: false,
  },
  {
    id: "sports6",
    title: "Youth Sports Programs Expand",
    shortDescription: "New funding boosts community initiatives.",
    datePosted: new Date(),
    user: "sportsdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/03/53/youth-sports-1863880_1280.jpg",
    videoUrl: "",
    category: "sports",
    slug: "youth-sports-programs-expand",
    content:
      "Local governments have announced increased funding for youth sports programs, aiming to promote physical activity and teamwork among children. New facilities are being built, and scholarships offered to talented young athletes. Coaches emphasize the importance of early engagement in sports.",
    isTrending: false,
    isLiveUpdate: true,
  },
  {
    id: "sports7",
    title: "Basketball Finals Draw Record Viewership",
    shortDescription: "Millions tune in for championship showdown.",
    datePosted: new Date(),
    user: "sportsdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/03/53/basketball-1863880_1280.jpg",
    videoUrl: "",
    category: "sports",
    slug: "basketball-finals-record-viewership",
    content:
      "The national basketball finals attracted over 20 million viewers, setting a new broadcast record. The game featured intense competition and a buzzer-beater finish. Advertisers and sponsors hailed the event as a major success, with social media buzzing for days afterward.",
    isTrending: true,
    isLiveUpdate: true,
  },
  {
    id: "sports8",
    title: "Marathon Sees International Participation",
    shortDescription: "Runners from 50 countries compete.",
    datePosted: new Date(),
    user: "sportsdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/03/53/marathon-1863880_1280.jpg",
    videoUrl: "",
    category: "sports",
    slug: "marathon-international-participation",
    content:
      "This year's city marathon welcomed over 10,000 runners from 50 countries, making it the most diverse edition yet. The event highlighted themes of unity and perseverance. Organizers praised the smooth logistics and community support, while athletes shared inspiring stories of preparation and triumph.",
    isTrending: false,
    isLiveUpdate: false,
  },
  {
    id: "sports9",
    title: "Coaches Call for Rule Changes",
    shortDescription: "Debate over fairness and safety intensifies.",
    datePosted: new Date(),
    user: "sportsdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/03/53/coach-1863880_1280.jpg",
    videoUrl: "",
    category: "sports",
    slug: "coaches-call-rule-changes",
    content:
      "A coalition of professional coaches has submitted proposals to revise rules in contact sports, citing concerns over player safety and game fairness. The recommendations include stricter penalties for dangerous plays and improved concussion protocols. Governing bodies are reviewing the suggestions.",
    isTrending: false,
    isLiveUpdate: true,
  },
  {
    id: "sports10",
    title: "Sports Tech Enhances Player Performance",
    shortDescription: "Wearables and analytics reshape training.",
    datePosted: new Date(),
    user: "sportsdesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/03/53/sports-tech-1863880_1280.jpg",
    videoUrl: "",
    category: "sports",
    slug: "sports-tech-player-performance",
    content:
      "Teams are increasingly using wearable tech and data analytics to monitor player performance and prevent injuries. Devices track heart rate, movement, and fatigue levels in real time. Coaches say the insights help tailor training programs and optimize recovery strategies.",
    isTrending: true,
    isLiveUpdate: false,
  },
];

const cultureNews = [
  {
    id: "culture1",
    title: "Art Exhibit Celebrates Indigenous Heritage",
    shortDescription: "Gallery showcases traditional and contemporary works.",
    datePosted: new Date(),
    user: "culturedesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2017/01/06/19/15/art-1956416_1280.jpg",
    videoUrl: "",
    category: "culture",
    slug: "art-exhibit-indigenous-heritage",
    content:
      "A new art exhibit opened this week featuring pieces from Indigenous artists across the continent. The collection includes traditional carvings, modern installations, and multimedia storytelling. Curators say the exhibit aims to honor cultural legacy while fostering dialogue about identity and resilience.",
    isTrending: true,
    isLiveUpdate: false,
  },
  {
    id: "culture2",
    title: "Film Festival Draws Global Talent",
    shortDescription: "Directors and actors gather for annual showcase.",
    datePosted: new Date(),
    user: "culturedesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2017/01/06/19/15/film-1956416_1280.jpg",
    videoUrl: "",
    category: "culture",
    slug: "film-festival-global-talent",
    content:
      "The International Film Festival kicked off with red carpet premieres and panel discussions featuring filmmakers from over 30 countries. Highlights include documentaries on climate change, dramas exploring migration, and animated shorts. Organizers praised the diversity and creativity of this year's lineup.",
    isTrending: false,
    isLiveUpdate: true,
  },
  {
    id: "culture3",
    title: "Museum Opens New Historical Wing",
    shortDescription: "Exhibit explores ancient civilizations.",
    datePosted: new Date(),
    user: "culturedesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2017/01/06/19/15/museum-1956416_1280.jpg",
    videoUrl: "",
    category: "culture",
    slug: "museum-historical-wing",
    content:
      "The National Museum unveiled a new wing dedicated to ancient civilizations, featuring artifacts from Mesopotamia, Egypt, and the Indus Valley. Interactive displays and augmented reality experiences allow visitors to explore historical contexts. Educational programs are also being launched for schools.",
    isTrending: true,
    isLiveUpdate: false,
  },
  {
    id: "culture4",
    title: "Fashion Week Highlights Sustainability",
    shortDescription: "Designers embrace eco-friendly materials.",
    datePosted: new Date(),
    user: "culturedesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2017/01/06/19/15/fashion-1956416_1280.jpg",
    videoUrl: "",
    category: "culture",
    slug: "fashion-week-sustainability",
    content:
      "This year's Fashion Week focused on sustainability, with designers showcasing collections made from recycled fabrics, plant-based dyes, and zero-waste techniques. Industry leaders discussed the future of ethical fashion and consumer responsibility. The event drew praise for its innovation and activism.",
    isTrending: false,
    isLiveUpdate: true,
  },
  {
    id: "culture5",
    title: "Music Awards Honor Rising Stars",
    shortDescription: "New artists take center stage at ceremony.",
    datePosted: new Date(),
    user: "culturedesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2017/01/06/19/15/music-1956416_1280.jpg",
    videoUrl: "",
    category: "culture",
    slug: "music-awards-rising-stars",
    content:
      "The annual Music Awards celebrated emerging talent with performances from breakout artists and genre-defying acts. Categories included Best New Artist, Song of the Year, and Global Impact. Critics praised the inclusive nominations and the spotlight on independent musicians.",
    isTrending: true,
    isLiveUpdate: false,
  },
  {
    id: "culture6",
    title: "Theater Revival Gains Popularity",
    shortDescription: "Classic plays return to the stage.",
    datePosted: new Date(),
    user: "culturedesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2017/01/06/19/15/theater-1956416_1280.jpg",
    videoUrl: "",
    category: "culture",
    slug: "theater-revival-popularity",
    content:
      "Local theaters are experiencing a renaissance as audiences flock to see revivals of classic plays. Productions of Shakespeare, Chekhov, and Soyinka are drawing sold-out crowds. Directors are blending traditional staging with modern interpretations to engage new generations of theatergoers.",
    isTrending: false,
    isLiveUpdate: true,
  },
  {
    id: "culture7",
    title: "Cultural Exchange Program Expands",
    shortDescription: "Students and artists travel abroad to share traditions.",
    datePosted: new Date(),
    user: "culturedesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2017/01/06/19/15/exchange-1956416_1280.jpg",
    videoUrl: "",
    category: "culture",
    slug: "cultural-exchange-program-expands",
    content:
      "A government-backed cultural exchange initiative is sending students, musicians, and visual artists abroad to share their heritage and learn from others. The program has doubled in size this year, with new partnerships in Asia, Europe, and South America. Participants report transformative experiences and lasting connections.",
    isTrending: true,
    isLiveUpdate: false,
  },
  {
    id: "culture8",
    title: "Book Fair Showcases Diverse Voices",
    shortDescription:
      "Authors highlight stories from underrepresented communities.",
    datePosted: new Date(),
    user: "culturedesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2017/01/06/19/15/books-1956416_1280.jpg",
    videoUrl: "",
    category: "culture",
    slug: "book-fair-diverse-voices",
    content:
      "The annual Book Fair featured panels and readings from authors representing marginalized communities. Topics ranged from identity and migration to gender and disability. Publishers announced new imprints focused on inclusive literature, and educators praised the fair's impact on curriculum development.",
    isTrending: false,
    isLiveUpdate: true,
  },
  {
    id: "culture9",
    title: "Dance Troupe Tours Internationally",
    shortDescription:
      "Performers bring traditional choreography to global stages.",
    datePosted: new Date(),
    user: "culturedesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2017/01/06/19/15/dance-1956416_1280.jpg",
    videoUrl: "",
    category: "culture",
    slug: "dance-troupe-international-tour",
    content:
      "A renowned dance troupe is touring internationally, performing traditional routines infused with modern flair. Their shows have captivated audiences in Europe, Asia, and the Americas. Critics praise the choreography for its emotional depth and cultural authenticity. Workshops are also being held in each city.",
    isTrending: true,
    isLiveUpdate: false,
  },
  {
    id: "culture10",
    title: "Culinary Traditions Spotlighted in Series",
    shortDescription: "New show explores global food heritage.",
    datePosted: new Date(),
    user: "culturedesk",
    picUrl:
      "https://cdn.pixabay.com/photo/2017/01/06/19/15/culinary-1956416_1280.jpg",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    category: "culture",
    slug: "culinary-traditions-series",
    content:
      "A new documentary series explores culinary traditions from around the world, highlighting the stories behind iconic dishes and the communities that preserve them. Each episode features immersive storytelling, vibrant visuals, and interviews with local chefs. Viewers have praised the show for its authenticity and warmth.",
    isTrending: false,
    isLiveUpdate: true,
  },
];

const podcasts = [
  {
    id: "podcast1",
    title: "Global Voices",
    shortDescription: "Stories and interviews from around the world.",
    datePosted: new Date(),
    user: "admin",
    picUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/05/08/microphone-1867121_1280.jpg",
    videoUrl: "",
    category: "world",
    slug: "global-voices",
  },
  {
    id: "podcast2",
    title: "Tech Pulse",
    shortDescription: "Weekly roundup of the latest in tech innovation.",
    datePosted: new Date(),
    user: "techguru",
    picUrl:
      "https://cdn.pixabay.com/photo/2020/04/07/15/20/artificial-intelligence-5018228_1280.jpg",
    videoUrl: "",
    category: "technology",
    slug: "tech-pulse",
  },
  {
    id: "podcast3",
    title: "Health Matters",
    shortDescription: "Expert insights on wellness, fitness, and medicine.",
    datePosted: new Date(),
    user: "healthhost",
    picUrl:
      "https://cdn.pixabay.com/photo/2021/01/22/10/47/vaccine-5938721_1280.jpg",
    videoUrl: "",
    category: "health",
    slug: "health-matters",
  },
  {
    id: "podcast4",
    title: "Politics Unpacked",
    shortDescription: "Breaking down the week’s biggest political stories.",
    datePosted: new Date(),
    user: "politicspro",
    picUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/03/53/parliament-1863880_1280.jpg",
    videoUrl: "",
    category: "politics",
    slug: "politics-unpacked",
  },
  {
    id: "podcast5",
    title: "Business Buzz",
    shortDescription: "Market trends, startup stories, and economic insights.",
    datePosted: new Date(),
    user: "biztalk",
    picUrl:
      "https://cdn.pixabay.com/photo/2015/05/31/12/14/stock-791322_1280.jpg",
    videoUrl: "",
    category: "business",
    slug: "business-buzz",
  },
  {
    id: "podcast6",
    title: "Culture Cast",
    shortDescription: "Exploring art, music, and cultural movements.",
    datePosted: new Date(),
    user: "culturehost",
    picUrl:
      "https://cdn.pixabay.com/photo/2017/01/06/19/15/music-1956416_1280.jpg",
    videoUrl: "",
    category: "culture",
    slug: "culture-cast",
  },
  {
    id: "podcast7",
    title: "Sports Talk",
    shortDescription: "Game highlights, athlete interviews, and analysis.",
    datePosted: new Date(),
    user: "sportsfan",
    picUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/03/53/soccer-1863880_1280.jpg",
    videoUrl: "",
    category: "sports",
    slug: "sports-talk",
  },
  {
    id: "podcast8",
    title: "Mindful Minutes",
    shortDescription: "Daily tips for mental clarity and emotional balance.",
    datePosted: new Date(),
    user: "wellnessguide",
    picUrl:
      "https://cdn.pixabay.com/photo/2017/01/06/19/15/yoga-1956416_1280.jpg",
    videoUrl: "",
    category: "health",
    slug: "mindful-minutes",
  },
  {
    id: "podcast9",
    title: "Startup Stories",
    shortDescription: "Founders share their journeys and lessons learned.",
    datePosted: new Date(),
    user: "founderfocus",
    picUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/03/53/startup-1863880_1280.jpg",
    videoUrl: "",
    category: "business",
    slug: "startup-stories",
  },
  {
    id: "podcast10",
    title: "News Brief",
    shortDescription: "Daily headlines and quick updates in 10 minutes.",
    datePosted: new Date(),
    user: "dailyhost",
    picUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/03/53/news-1863880_1280.jpg",
    videoUrl: "",
    category: "world",
    slug: "news-brief",
  },
];

const allNews = [
  ...worldNews,
  ...politicsNews,
  ...businessNews,
  ...technologyNews,
  ...healthNews,
  ...sportsNews,
  ...cultureNews,
];
mongoose.connect(process.env.MONGODB_URI).then(async () => {
  // await News.deleteMany({});
  await Podcast.deleteMany({});
  // await News.insertMany(allNews);
  // await Podcast.insertMany(podcasts);
  // console.log("Database seeded successfully!");
  await News.deleteMany({
    id: { $in: allNews.map((item) => item.id) },
  });
  // console.log(allNews.map((item) => item.id));

  console.log("Information deleted successfully");

  // await Podcast.deleteMany(podcasts);

  mongoose.disconnect();
});
