// quizz.component.ts

import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})

export class QuizzComponent implements OnInit {

  title:string = ""

  questions:any
  questionSelected:any

  answers:string[] = []
  answerSelected:string =""

  questionIndex:number =0
  questionMaxIndex:number=0

  finished:boolean = false

  resultImage: string = '';

  constructor() { }

  ngOnInit(): void {
    if(quizz_questions){
      this.finished = false
      this.title = quizz_questions.title

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length

      console.log(this.questionIndex)
      console.log(this.questionMaxIndex)
    }
  }

  playerChoose(value:string){
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep(){
    this.questionIndex+=1

    if(this.questionMaxIndex > this.questionIndex){
        this.questionSelected = this.questions[this.questionIndex]
    }else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      // Esta linha atribui a frase exata do JSON à answerSelected
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results ]

      // Adicionando um console.log para você DEPURAR o valor exato de answerSelected
      console.log("DEBUG: Valor de answerSelected antes de displayResultImage():", this.answerSelected);

      this.displayResultImage();
    }
  }

  async checkResult(anwsers:string[]){

    const result = anwsers.reduce((previous, current, i, arr)=>{
        if(
          arr.filter(item => item === previous).length >
          arr.filter(item => item === current).length
        ){
          return previous
        }else{
          return current
        }
    })

    return result
  }

  // NOVO MÉTODO PARA DEFINIR O CAMINHO DA IMAGEM DO RESULTADO
  displayResultImage(): void {
    // *** CORREÇÃO APLICADA AQUI: Compare com as strings EXATAS do seu JSON. ***
    // Baseado nas suas imagens, a frase que vem do JSON não inclui "escolha qual você quer ser!"
    if (this.answerSelected === 'Você muito provavelmente seria um super vilão!') {
      this.resultImage = 'assets/imgs/viloes.jpg';
      console.log("DEBUG: Imagem definida para vilão:", this.resultImage);
    } else if (this.answerSelected === 'Você muito provavelmente seria um super Herói!') { // "Herói!" com 'H' maiúsculo e acento
      this.resultImage = 'assets/imgs/heroi.jpg';
      console.log("DEBUG: Imagem definida para herói:", this.resultImage);
    } else {
      // Caso não seja nenhum dos resultados esperados, pode deixar vazio ou definir uma imagem padrão
      this.resultImage = '';
      console.log("DEBUG: Nenhuma imagem definida para o resultado:", this.answerSelected);
    }
  }

}