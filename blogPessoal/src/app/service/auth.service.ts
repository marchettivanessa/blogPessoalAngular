import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { UserLogin } from '../model/UserLogin';
import { User } from '../model/User';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  logar(userLogin: UserLogin){
    return this.http.post('http://localhost:8080/usuarios/logar', userLogin);
  }

  cadastrar(user: User){
    return this.http.post('http://localhost:8080/usuarios/cadastrar', user)
  }

  btnSair(){
    let ok = false
    let token = environment.token

    if(token != ''){
      ok = true
    }
    return ok
  }

  btnLogin(){
    let ok = false
    let token = environment.token
    if(token == ''){
      ok=true
    }
    return ok
  }
}
