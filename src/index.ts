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

enum ColorMode {
    Light =  "light",
    Dark = "dark"
  }


class Index{
  colorMode: ColorMode;
  constructor(colorMode: ColorMode) {
    this.colorMode = colorMode;
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
    this.setColorMode(this.colorMode);
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

  setColorMode = (colorMode: ColorMode) =>{
    this.colorMode = colorMode;
    const boxClass =(opposite:boolean)=> {
      let value = this.colorMode === ColorMode.Dark
      value = opposite === true ? value : !value
      return value === true ? "box": "box-dark"
    };
    const boxHeaderClass =(opposite:boolean)=> {
      let value = this.colorMode === ColorMode.Dark
      value = opposite === true ? value : !value
      return value === true ? "box-header": "box-header-dark"
    };
    const boxTextClass =(opposite:boolean)=> {
      let value = this.colorMode === ColorMode.Dark
      value = opposite === true ? value : !value
      return value === true ? "box-ext": "box-text-dark"
    };
    
    const boxElements = document.querySelectorAll(`.${boxClass(true)}`)
    boxElements.forEach((box) => {
      box.classList.remove(boxClass(true))
      box.classList.add(boxClass(false))
    })
    const boxHeaderElements = document.querySelectorAll(`.${boxHeaderClass(true)}`)
    boxHeaderElements.forEach((boxHeader) => {
      boxHeader.classList.replace(boxHeaderClass(true), boxHeaderClass(false));
    })
    const boxTextElements = document.querySelectorAll(`.${boxTextClass(true)}`)
    boxTextElements.forEach((boxText) => {
      boxText.classList.replace(boxTextClass(true), boxTextClass(false))
    })
  }

  updateFullName = (fullName:string) =>{
    const fullNameParagraph = document.getElementById('user_fullname') as HTMLParagraphElement;
    if (!fullNameParagraph) {
      throw new Error("No fullname paragraph element")
    };
    fullNameParagraph.textContent = fullName;
    if (this.colorMode === ColorMode.Dark){
      fullNameParagraph.classList.add('text-purple-300')
    }
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
      let lightModeClassList = ['pt-[3px]', 'md:text-[16px]','lg:text-[12px]',  'text-gray-400','md:w-[140px]', 'xs:w-[140px]', 'sm:w-[140px]', 'lg:w-[100px]', 'flex-grow-0']
      let darkModeClassList = ['pt-[3px]', 'md:text-[16px]','lg:text-[12px]',  'text-gray-100','md:w-[140px]', 'xs:w-[140px]', 'sm:w-[140px]', 'lg:w-[100px]', 'flex-grow-0']
      let classList = this.colorMode === ColorMode.Dark ? darkModeClassList : lightModeClassList
      keyParagraph.classList.add(...classList)
      keyParagraph.textContent = key.replace("_", " ");
      const valueParagraph = document.createElement('p');
      lightModeClassList = ['lg:text-[14px]', 'md:text-[20px]', 'text-gray-700', 'flex-grow']
      darkModeClassList = ['lg:text-[14px]', 'md:text-[20px]', 'text-gray-400', 'flex-grow']
      classList = this.colorMode === ColorMode.Dark? darkModeClassList : lightModeClassList
      valueParagraph.classList.add(...classList);
      valueParagraph.textContent = value;
      item.appendChild(keyParagraph);
      item.appendChild(valueParagraph);
      userDetailDiv?.appendChild(item);
      return item;
    }
    const details_keys = ["age", "education", "marital_status", "location", "occupation", "tech_literate", "tech_interest", "tech_expertise"]

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
      const lightModeClassList = ['bg-gray-100', 'text-black', 'font-normal', 'py-1', 'px-3', 'rounded-full']
      const darkModeClassList = ['bg-gray-700', 'text-white', 'font-normal', 'py-1', 'px-3', 'rounded-full']
      const classList = this.colorMode === ColorMode.Dark ? darkModeClassList : lightModeClassList
      item.classList.add(...classList);
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
    if (this.colorMode === ColorMode.Dark){
      userBioParagraph.classList.add('text-white')
    }
  };
}

  new Index(ColorMode.Light)