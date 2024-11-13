// src/index.ts
import './index.css';

import * as fs from 'fs';
const filePath = 'db.json';


interface Profile {
  first_name: string;
  last_name: string;
  picture_url: string;
  age: string;
  education: string
  marital_status: string
  location: string
  occupation: string
  tech_literate: string
}
interface JsonResponse {
  profile : Profile;
  quote: string;
  personality: string[];
  bio: string;
  needs: string[];
  frustrations: string[];
  brands: string[];
  payment_medium: string[];
  payment_method: string[];

}


class Index{
  constructor() { 
    this.fetchJsonFromServer(filePath).then((data:JsonResponse)=>{
      console.log("data has been fetched successfully")
      this.readyUI(data);
    }).catch((error)=>{
      console.error("Error fetching JSON:", error);
    });
    
  }

  readyUI = (data:JsonResponse|null)=>{
    if(!data){
      throw new Error("No data provided")
    }
    this.updateFullName(`${data.profile.first_name} ${data.profile.last_name}`);
    this.updateProfilePicture(data.profile.picture_url);
    this.updateUserDetails(data.profile);
    this.updateUserQuote(data.quote);
    this.updateUserBio(data.bio);
    this.updateUserPersonality(data.personality);
    this.updateUserFrustrations(data.frustrations);
    this.updateUserNeeds(data.needs);
  }

  fetchJsonFromServer = async(filePath: string)=> {
    const response = await fetch(filePath);
    const jsonData = await response.json();
    return jsonData;
  }

  updateFullName = (fullName:string) =>{
    const fullNameParagraph = document.getElementById('user_fullname') as HTMLParagraphElement;
    if (!fullNameParagraph) {
      throw new Error("No fullname paragraph element")
    };
    fullNameParagraph.textContent = fullName;
  }

  updateProfilePicture = (imageLink:string) =>{
    const profileImage = document.getElementById('user_profile_pic') as HTMLImageElement;
    if (!profileImage) {
      throw new Error("No profile picture element")
    };
    profileImage.src = imageLink;
  }

  updateUserDetails = (profile: any) =>{
    const userDetailDiv = document.getElementById('user_details') as HTMLDivElement;
    if (!userDetailDiv){
      throw new Error("No user details element")
    }
    const userDetailItem = (key:string, value:string) => {
      const item = document.createElement('div');
      item.classList.add('flex', 'flex-row', 'gap-x-3');
      const keyParagraph = document.createElement('p');
      keyParagraph.classList.add('pt-[3px]', 'detail-key', 'text-gray-400','w-[120px]', 'flex-grow-0' 

      );
      keyParagraph.textContent = key;
      const valueParagraph = document.createElement('p');
      valueParagraph.classList.add('detail-value', 'text-gray-700');
      valueParagraph.textContent = value;
      item.appendChild(keyParagraph);
      item.appendChild(valueParagraph);
      userDetailDiv?.appendChild(item);
      return item;
    }
    const details_keys = ["age", "education", "marital_status", "location", "occupation", "tech_literate"]

    details_keys.forEach(key => {
      const item = userDetailItem(key.toUpperCase(), profile[key]) as HTMLDivElement;
      userDetailDiv?.appendChild(item);
    });

  }

  updateUserPersonality = (personalities: string[])=>{
    const userPersonalityDiv = document.getElementById('user_personality') as HTMLDivElement;
    if (!userPersonalityDiv){
      throw new Error("No user personality element")
    }
    personalities.forEach(personality => {
      const item = document.createElement('p');
      item.textContent = personality;
      item.classList.add('bg-gray-100', 'text-black', 'font-normal', 'py-1', 'px-3', 'rounded-full');
      userPersonalityDiv?.appendChild(item);
    });
  }

  updateUserNeeds = (needs: string[])=>{
    const userNeedsDiv = document.getElementById('user_needs') as HTMLUListElement;
    if (!userNeedsDiv){
      throw new Error("No user needs element")
    }
    needs.forEach(need => {
      const item = document.createElement('li');
      item.textContent = need;
      item.classList.add('box-list-item');
      userNeedsDiv.appendChild(item);
    });
  }

  updateUserFrustrations = (frustrations: string[])=>{
    const userFrustrationsDiv = document.getElementById('user_frustrations') as HTMLUListElement;
    if (!userFrustrationsDiv){
      throw new Error("No user frustrations element")
    }
    frustrations.forEach(frustration => {
      const item = document.createElement('li');
      item.textContent = frustration;
      item.classList.add('box-list-item');
      userFrustrationsDiv.appendChild(item);
    });
  }

  updateUserQuote = (quote: string)=>{
    const userQuoteDiv = document.getElementById('user_quote') as HTMLParagraphElement;
    if (!userQuoteDiv){
      throw new Error("No user quote element")
    }
    userQuoteDiv.textContent = quote;
  };

  updateUserBio = (bio:string)=>{
    const userBioParagraph = document.getElementById('user_bio') as HTMLParagraphElement;
    if (!userBioParagraph){
      throw new Error("No user bio element")
    }
    userBioParagraph.textContent = bio;
  };
}

  new Index()