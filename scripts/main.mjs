const main = (function() {
    
    const displays = 
    [
        document.querySelector('#main_display_text'),
        document.querySelector('#secondary_display_text'),
        document.querySelector('#operator_display_text'),
    ];
    
    const buttons = document.querySelectorAll('button');
    buttons.forEach ( button =>{
        button.addEventListener('click', () => {
           
            if (button.className.includes('numbers')){ 
                if(calculator.result.length > 0){
                    calculator.clear();
                    displays[0].innerHTML = '0';
                    displays[1].innerHTML = '';
                    displays[2].innerHTML = '';
                }        
                if (calculator.num[calculator.com].length < 12) {
                    calculator.num[calculator.com] += button.textContent;
                  displays[0].innerHTML = calculator.num[calculator.com];
                }
            }
            if (button.className.includes('op')){ 
                if(calculator.num[0].length > 0){
                  calculator.operation = button.textContent;
                  displays[2].innerHTML = calculator.operation;
                  displays[1].innerHTML = calculator.num[0];

                  if (calculator.num[1].length === 0){
                    calculator.com = 1;
                    displays[0].innerHTML = '0';
                  }
                  else if (calculator.num[1].length > 0){
                    calculator.result = calculator.calculate();
                    calculator.num[0] = calculator.result.toString();
                    displays[0].innerHTML = calculator.num[0];
                    displays[1].innerHTML = calculator.num[1];
                  }
                }
            }
            else if (button.id === 'equals'){
                if (calculator.num[0] !== '' && calculator.num[1] !== '' && calculator.operation !== ''){
                    calculator.result = calculator.calculate();
                    calculator.num[0] = calculator.result.toString();
                    calculator.num[1] = '';
                    calculator.operation = '';
                    calculator.com = 0;
                    displays[0].innerHTML = calculator.num[0];
                    displays[1].innerHTML = calculator.num[1];
                    displays[2].innerHTML = calculator.operation;
                }
                    
            }
            else if (button.id === 'clear'){
             calculator.clear();
             displays[0].innerHTML = '0';
             displays[1].innerHTML = '';
             displays[2].innerHTML = '';
            }
            else if (button.id === 'point'){
                if(calculator.num[calculator.com].length > 0 && !(calculator.num[0].includes('.'))){
                    calculator.num[0] += '.';
                    displays[calculator.com].innerHTML = calculator.num[calculator.com];
                }      
                
            }           
        });
    });
    
    document.addEventListener('keydown', (event) => {
        const key = event.key;
    
        // Numbers
        if (/^[0-9]$/.test(key)) {
            document.querySelector(`button.numbers[data-key="${key}"]`).click();
        }
        // Operators
        else if (['+', '-', '*', '/'].includes(key)) {
            document.querySelector(`button.op[data-key="${key}"]`).click();
        }
        // Equals
        else if (key === 'Enter' || key === '=') {
            document.getElementById('equals').click();
        }
        // Clear
        else if (key === 'Escape' || key === 'c' || key === 'C') {
            document.getElementById('clear').click();
        }
        // Decimal point
        else if (key === '.') {
            document.getElementById('point').click();
        }
    });

})();
    
        let calculator = {
        num: ['', ''],
        result: '',
        operation: '',
        com: 0,

        clear: function(){
            this.num[0] = '';
            this.num[1] = '';
            this.result = '';
            this.operation = '';
            this.com = 0;
        },
        calculate: function() {
            
            switch(this.operation) {
                case '+':
                    this.com = 0;
                    return parseFloat(this.num[0]) + parseFloat(this.num[1]);
                case '-':
                    this.com = 0;
                    return parseFloat(this.num[0]) - parseFloat(this.num[1]);
                case '*':
                    this.com = 0;
                    return parseFloat(this.num[0]) * parseFloat(this.num[1]);
                case '/':
                    this.com = 0;
                    return parseFloat(this.num[0]) / parseFloat(this.num[1]);
    
                // Add other cases here
                default:
                    return '';
            }
        }
    };

    
