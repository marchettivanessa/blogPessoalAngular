import { Component, OnInit } from '@angular/core';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { AlertasService } from '../service/alertas.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  key = 'data'
  reverse = true //último item inserido no array irá para o começo da fila

  postagem: Postagem = new Postagem()
  listaPostagens:Postagem[]
  titulo: string

  tema: Tema = new Tema();
  listaTemas: Tema[];
  idTema: number;
  nomeTema: string;

  constructor(
    private postagemService: PostagemService,
    private temaService: TemaService,
    private alert: AlertasService

  ) { }

  ngOnInit(){
    window.scroll(0,0) /*carrega o caminho do topo da página*/
    
    this.findAllPostagens()
    this.findAllTemas()
  }

  findAllPostagens(){
    return this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp;
    })
  }

  findAllTemas(){
    this.temaService.getAllTemas().subscribe((resp: Tema[]) =>{
      this.listaTemas = resp
    })
    
  }

  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    if(this.postagem.titulo == null || this.postagem.texto == null || this.postagem.tema == null){
      this.alert.showAlertInfo('Preencha todos os campos antes de publicar!')
    } else{
      this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) =>{
        this.postagem = resp;
        this.postagem = new Postagem();
        this.alert.showAlertSuccess('Postagem realizada com sucesso!');
        this.findAllPostagens; //lista todas as postagens após a publicação
      })
    }
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp;})
  }

  findByTituloPostagem(){
    if(this.titulo == ""){
      this.findAllPostagens()
    } else{
      this.postagemService.getByTitutloPostagem(this.titulo).subscribe((resp: Postagem[]) =>{
        this.listaPostagens = resp
      })
    }
  }

  findByNomeTema(){
    if(this.nomeTema == ''){
      this.findAllTemas()
    } else{
      this.temaService.getByNomeTema(this.nomeTema).subscribe((resp: Tema[]) => {
        this.listaTemas = resp 
      })

    }
  }

}
