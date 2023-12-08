/*Research Details Table*/

const researchTable = document.querySelector(".main");

const research = [
  {
    title: "Coconut Tree Detection Using Deep Learning Models",
    authors:
      "Deepthi Sudharsan, K. Harish, U. Asmitha, S. Roshan Tushar, H. Theivaprakasham, V. Sowmya, V. V. Sajith Variyar, Krishnamoorthy Deva Kumar & Vinayakumar Ravi ",
    conferences:
      "Innovations in Machine and Deep Learning: Case Studies and Applications | Published by Springer Nature Switzerland | 2023, Vol 134",
    researchYr: 2023,
    citebox: "popup1",
    image: "assets/images/research-page/coconuttree.png",
    citation: {
      vancouver:
        "Sudharsan, D. et al. (2023). Coconut Tree Detection Using Deep Learning Models. In: Rivera, G., Rosete, A., Dorronsoro, B., Rangel-Valdez, N. (eds) Innovations in Machine and Deep Learning. Studies in Big Data, vol 134. Springer, Cham. https://doi.org/10.1007/978-3-031-40688-1_21",
    },
    abstract:
      "Food supplies suffer serious damage in extreme disasters such as earthquakes, cyclones, and tsunamis. In such cases, rapid evaluation of food supplies from agricultural land is crucial because it enables humanitarian operations in disaster-affected communities. In this chapter, a deep learning strategy for detecting and segmenting coconut trees is provided after experimenting with training object detection models on the low and high-resolution dataset of coconut trees. A low-resolution dataset was created by taking snapshots of coconut trees from Google Earth, and a high-resolution dataset that was available from Github was utilized for our purpose. For this chapter, several models—namely Faster RCNN, DETR, YOLOv5, and RetinaNet—have been used, with Microsoft COCO dataset evaluation metric, which is Average Precision (AP) over varying IoU thresholds(IoU = 0.50:0.5:0.95, area = all) as the criteria for evaluation. Initially, the models were trained on the collected low-resolution dataset and tested on both datasets to check the robustness of the trained models. The RetinaNet model with the Resnet50 model performed the best with a COCO metric of 0.301 on the low-resolution dataset. However, the same models performed poorly when tested on the high-resolution dataset. Therefore, the models were trained on the high-resolution dataset and tested again. This time, a COCO metric of 0.578 was achieved using the vfnet model with a swin backbone. This result is higher than the benchmark COCO metric score achieved by the original authors of the work on the high-resolution dataset, where the authors achieved a COCO metric score of 0.477 using YOLO-VOC.",
    absbox: "absPopup1",
  },

  {
    title: "Analysis of Machine Learning and Deep Learning Algorithms for Detection of Brain Disorders Using MRI Data",
    authors:
      "Deepthi Sudharsan, S. Isha Indhu, Kavya S. Kumar, Lakshaya Karthikeyan, L. Srividhya, V. Sowmya, E. A. Gopalakrishnan & K. P. Soman",
    conferences:
      "Artificial Intelligence on Medical Data, Biomedical Signal Processing | Published by Springer, Singapore | 2023, Vol 37",
    researchYr: 2023,
    citebox: "popup2",
    image: "assets/images/research-page/braindisorders.png",
    citation: {
      vancouver:
        "Sudharsan, D. et al. (2023). Analysis of Machine Learning and Deep Learning Algorithms for Detection of Brain Disorders Using MRI Data. In: Gupta, M., Ghatak, S., Gupta, A., Mukherjee, A.L. (eds) Artificial Intelligence on Medical Data. Lecture Notes in Computational Vision and Biomechanics, vol 37. Springer, Singapore. https://doi.org/10.1007/978-981-19-0151-5_4",
    },
    abstract:
      "Brain diseases impact more than 1 billion people worldwide and include a wide spectrum of diseases and disorders such as stroke, Alzheimer’s, Parkinson’s, Epilepsy and other Seizure disorders. Most of these brain illnesses are subjected to misclassification, and early diagnosis increases the possibilities of preventing or delaying the development of these disorders. Magnetic Resonance Imaging (MRI) plays an important role in the diagnosis of patients with brain disorders and offers the potential of non-invasive longitudinal monitoring and bio-markers of disease progression. Our work focuses on using machine learning and deep learning techniques for the preemptive diagnosis of Schizophrenia using Kaggle data set and Alzheimer’s using TADPOLE data set comprising of MRI features. Since the number of works using TADPOLE data set is minimum, we have chosen this for our study. Machine learning algorithms such as support vector machine (SVM), Decision Tree, Random Forest, Gaussian Naive Bayes, and 1D-CNN deep learning algorithm have been used for the classification of the disorders. It has been observed that Gaussian NB performed the best on Schizophrenia data, while Random Forest outperformed on Alzheimer’s data compared to the other classifiers.",
    absbox: "absPopup2",
  },

  {
    title:
      "DistilRoBERTa Based Sentence Embedding for Rhetorical Role Labelling of Legal Case Documents",
    authors: "Deepthi Sudharsan, Asmitha U, Premjith B and Soman K.P",
    conferences:
      "FIRE'21 | December 2021",
    researchYr: 2021,
    citebox: "popup3",
    image: "assets/images/research-page/distilroberta.png",
    citation: {
      vancouver:
        "Sudharsan, Deepthi et al. “DistilRoBERTa Based Sentence Embedding for Rhetorical Role Labelling of Legal Case Documents.” Fire (2021).",
    },
    abstract:
      "In a country like India with a very dense and growing population, every year the number of legal judgements filed keep increasing. With increasing number of legal case documents, a systematic and structured organization of the files are essential for the smooth running of the legal system. As a part of AILA 2021, assigning rhetorical roles of legal documents was given as a shared task to automate the process. Deep Learning and Machine Learning models help achieve this task with ease and minimal error. For efficient information retrieval and classification, preprocessing and word embedding techniques such as sentence transformation have been discussed in the paper. Artificial Neural Networks performed the best and consequently, it was used to further evaluate and improve the prediction of the rhetorical roles. In comparison to other Machine Learning and Deep learning models trained for the task, a basic Artificial Neural Network with one hidden layer and 1024 × 2 neurons gave the maximum validation accuracy of 85.18% and testing precision of 30.9%.",
    absbox: "absPopup3",
  },
];
AOS.init();
const fillData = () => {
  let output = "";
  research.forEach(
    ({
      image,
      title,
      authors,
      conferences,
      researchYr,
      citebox,
      citation,
      absbox,
      abstract,
    }) =>
      (output += `
            <tr data-aos="zoom-in-left"> 
                <td class="imgCol"><img src="${image}" class="rImg"></td>
                <td class = "researchTitleName">
                    <div class="img-div">
                        <span class="imgResponsive">
                            <img src="${image}" class="imgRes">
                        </span>
                    </div>
                    <a href="#0" class="paperTitle"> ${title} </a> 
                    <div class = "authors"> ${authors} </div> 
                    
                    <div class="rConferences"> ${conferences} 
                        <div class="researchY">${researchYr}</div>
                    </div>
                    
                    <!--CITE BUTTON-->
                    <div class="d-flex" style="margin-right:5%;">
                        <button class="button button-accent button-small text-right button-abstract " type="button" data-toggle="collapse" data-target="#${absbox}" aria-expanded="false" aria-controls="${absbox}">
                            ABSTRACT
                        </button>
                
                        <button class="button button-accent button-small text-right button-abstract " type="button" data-toggle="collapse" data-target="#${citebox}" aria-expanded="false" aria-controls="${citebox}">
                            CITE
                        </button>
                    </div>
                    <div id="${absbox}" class="collapse" aria-labelledby="headingTwo" data-parent=".collapse">
                        <div class="card-body">
                            ${abstract}    
                        </div>
                    </div>
                    <div id="${citebox}" class="collapse" aria-labelledby="headingTwo" data-parent=".collapse">
                        <div class="card-body">
                            ${citation.vancouver}    
                        </div>
                    </div>
                </td>
            </tr>`)
  );
  researchTable.innerHTML = output;
};
document.addEventListener("DOMContentLoaded", fillData);
