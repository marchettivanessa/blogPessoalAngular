import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-put-postagem',
  templateUrl: './put-postagem.component.html',
  styleUrls: ['./put-postagem.component.css']
})
export class PutPostagemComponent implements OnInit {

  postagem: Postagem = new Postagem()
  idPost: number

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number

  constructor(
    private temaService: TemaService,
    private postagemService: PostagemService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(){
    window.scroll(0,0)
    
    this.idPost = this.route.snapshot.params["id"]
    this.findByIdPostagem(this.idPost)

    this.findAllTemas()
  }

  findByIdPostagem(id: number){
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
      this.postagem = resp
    })
  }

  salvar(){ 
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.postagemService.putPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      this.router.navigate(['/feed'])
      alert('Postagem alterada com sucesso!')
    }, err =>{
      if(err.status == '500'){ //tratativa de erro - verifica se o usuário enviou o objeto completo
        alert('Preencha todos os campos antes de enviar!')
      }
    })
  }

  findAllTemas(){
    this.temaService.getAllTemas().subscribe((resp: Tema[]) =>{
      this.listaTemas = resp
    })
    
  }

  findByIdTema(id: number){
    this.temaService.getByIdTema(id).subscribe((resp: Tema) => {
      this.tema = resp;})
  }

}
