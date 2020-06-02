import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(inputArray: any, filter: any, propNameArray: any): any {
    const resultArray = [];
    for(const e of inputArray){
      for(const pn of propNameArray){
        for(const f of filter[pn]){
          if(e[pn]==f){
            resultArray.push(e);
          }
        }
      }
    }
    console.log(resultArray);
    return inputArray;
  }

}
