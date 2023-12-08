AOS.init();

//  Work experience cards

const experiencecards = document.querySelector(".experience-cards");
const exp = [
  {
    title: "Research Fellow",
    cardImage: "assets/images/experience-page/msr.jpg",
    place: "Microsoft Research India",
    time: "(July, 2023 - present)",
    desp: "<li>Selected as one of the 30 research fellows accepted for the MSR Research Fellow Program out of 13,000+ applicants.</li> <li>Predominantly working with LLMs and LLM-based agents using Azure OpenAI, Langchain, etc.</li> <li>Extra Curricular: Co-leading the MSRI Arts and Crafts Hobby Club, an active participant in the Speech and NLP and LLM Reading Groups. Participated in MSR (mock VC) Shark Tank and Global Microsoft Hackathon 2023.</li>",
  },
  {
    title: "Technology Consulting Intern - Emerging Technologies",
    cardImage: "assets/images/experience-page/pwc.jpg",
    place: "PwC India",
    time: "(Jan - Jul, 2023)",
    desp: "<li>Interned at PriceWaterhouseCoopers, one of the Big 4, as a technology consultant in the Emerging Technology (Advisory Line of Service), predominantly working on Cloud and Edge Computing - AI/ML</li><li>Developed a Proof-of-Concept (from model development to serving) for identifying and classifying six types of weld defects from the images using Deep Neural Nets</li><li>Developed a Proof-of-Concept (ANPR system - model development, OCR, model serving) for an ANPR detection system for monitoring vehicle entries at ports.</li><li>Worked on identifying use cases and integrating GenAI with DevOps using Azure OpenAI API, Langchain, etc</li>",
  },
  {
    title: "Machine Learning Intern",
    cardImage: "assets/images/experience-page/tmlc.png",
    place: "The Machine Learning Company (TMLC)",
    time: "(Oct - Dec, 2021)",
    desp: "<li>Was offered an internship impressed by my works at the TMLC fellowship projects.</li><li>Built end-to-end Machine Learning solutions for predicting and analyzing the content uniformity of various substances in tablets based on their spectroscopy data.</li>",
  },
];

const showCards2 = () => {
  let output = "";
  exp.forEach(
    ({ title, cardImage, place, time, desp }) =>
      (output += `        
    <div class="col gaap" data-aos="fade-up" data-aos-easing="linear" data-aos-delay="100" data-aos-duration="400"> 
      <div class="card card1">
        <img src="${cardImage}" class="featured-image"/>
        <article class="card-body">
          <header>
            <div class="title">
              <h3>${title}</h3>
            </div>
            <p class="meta">
              <span class="pre-heading">${place}</span><br>
              <span class="author">${time}</span>
            </p>
            <ol>
              ${desp}
            </ol>
          </header>
        </article>
      </div>
    </div>
      `)
  );
  experiencecards.innerHTML = output;
};
document.addEventListener("DOMContentLoaded", showCards2);

// Volunteership Cards

const volunteership = document.querySelector(".volunteership");
const volunteershipcards = [
  {
    title: "Microsoft Learn Student Ambassadors (Beta MLSA)",
    cardImage: "assets/images/experience-page/mlsa.png",
    description:
      "Held events on Machine Learning using Microsoft Services.",
  },
  {
    title: "Google Developer ML Bootcamp Apprentice",
    cardImage: "assets/images/experience-page/google-developers.png",
    description:
      "Completed DL Specialization courses and participated in Kaggle Challenges.",
  },
  {
    title: "Head and Founder of DeepThought",
    cardImage: "assets/images/experience-page/deepthought.jpg",
    description:
      "Head of the first AI Club of Amrita Vishwa Vidyapeetham.",
  },
];

const showCards = () => {
  let output = "";
  volunteershipcards.forEach(
    ({ title, cardImage, description }) =>
      (output += `        
      <div class="card volunteerCard" data-aos="fade-down" data-aos-easing="linear" data-aos-delay="100" data-aos-duration="600" style="height: 550px;width:400px">
      
      <img src="${cardImage}" height="250" width="65" class="card-img" style="border-radius:10px">
      <div class="content">
          <h2 class="volunteerTitle">${title}</h2><br>
          <p class="copy">${description}</p></div>
      
      </div>
      `)
  );
  volunteership.innerHTML = output;
};
document.addEventListener("DOMContentLoaded", showCards);

// Hackathon Section

const hackathonsection = document.querySelector(".hackathon-section");
const mentor = [
  {
    title: "Amazon ML Challenge 2023",
    subtitle: "Participant",
    image: "assets/images/experience-page/amazonml.jpg",
    desp: "My team placed #125 out of 5000 teams that participated in the hackathon.",
    href: "https://www.amazonmlchallenge.com/",
  },
  {
    title: "Amazon ML Challenge 2021",
    subtitle: "Participant",
    image: "assets/images/experience-page/amazonml.jpg",
    desp: "My team placed 111th place out of 3600+ teams.",
    href: "https://www.amazonmlchallenge.com/",
  },
  {
    title: "DTU - BITGRIT Viral Tweets Prediction Hackathon 2021",
    subtitle: "Participant",
    image: "assets/images/experience-page/bitgritdtu.jpg",
    desp: "I placed 11th out of 1000+ participants.",
    href: "https://unstop.com/hackathons/viral-tweets-prediction-challenge-delhi-technological-university-dtu-new-delhi-175005",
  },
  {
    title: "APSCRIPT 2021 Hackathon",
    subtitle: "Participant (Finalist)",
    image: "assets/images/experience-page/apscript.jpg",
    desp: "My team went till the finals.",
    href: "",
  },
];

const showCards3 = () => {
  let output = "";
  mentor.forEach(
    ({ title, image, subtitle, desp, href }) =>
      (output += `  
      <div class="blog-slider__item swiper-slide">
        <div class="blog-slider__img">
            <img src="${image}" alt="">
        </div>
        <div class="blog-slider__content">
          <div class="blog-slider__title">${title}</div>
          <span class="blog-slider__code">${subtitle}</span>
          <div class="blog-slider__text">${desp}</div>
          <a href="${href}" class="blog-slider__button">Read More</a>   
        </div>
      </div>
      `)
  );
  hackathonsection.innerHTML = output;
};
document.addEventListener("DOMContentLoaded", showCards3);
