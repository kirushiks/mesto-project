export class UserInfo {
  constructor({profileNameSelector, profileInfoSelector} ) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileInfo = document.querySelector(profileInfoSelector);
    this._name = '';
    this._about = '';
    }

  updateUserInfo() {
    this._profileName.textContent = this._name;
    this._profileInfo.textContent = this._about;
  }

  setUserInfo(user) {
    this._name = user.name;
    this._about = user.about;
}
  
  getUserInfo() {
     return {
      name: this._name,
      about: this._about
     }  
  } 
}

