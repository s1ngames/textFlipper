import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class Form extends React.Component {
    state = {
        input_text:'',
        copy_error:'',
        copied_message:'',
        history:[],
        history_copied_message:''
    };

    onTextChange = (e) => {
        // console.log(e.target.value);
        this.setState(()=>({
            copy_error:'',
            copied_message:'',
            history_copied_message:''
        }));
        const text = e.target.value;
        var splitString = text.split("");
        var reverseArray = splitString.reverse();
        var joinArray = reverseArray.join("");
        this.setState(()=>({
            input_text: joinArray
        }));
    };

    onCopy = (text, result) =>{
        if(text === ''){
            this.setState(()=>({
                copy_error:'בבקשה הזן טקסט כדי להעתיק'
            }));
        }else{
            document.getElementById('text-area').select();
            var splitString = text.split("");
            var reverseArray = splitString.reverse();
            var joinArray = reverseArray.join("");
            this.setState((prevState)=>({
                copy_error:'',
                copied_message:'הטקסט הועתק',
                history:[...this.state.history,joinArray]
            }));
        }
    };

    onHistoryButtonClick = () => {
        // this.setState(()=>({ history_copied_message:'הטקסט הועתק' }));
    };

    render(){
        return(
            <div>
            <div className='container'>
                <textarea
                id='text-area'
                className='text-area' 
                type='text'
                placeholder='הכנס טקסט שברצונך להפוך'
                onChange={this.onTextChange}
                />
                <div>
                <p className='result_p'>{`תוצאה: ${this.state.input_text}`}</p>
                {this.state.copy_error ? <p className='error-message'>{this.state.copy_error}</p> : undefined}
                
                </div>
                <CopyToClipboard text={this.state.input_text}
                onCopy={this.onCopy}>
                    <button className="copy_button">העתק תוצאה</button>
                </CopyToClipboard>
                <p className="text_copied">{this.state.copied_message ? <p>{this.state.copied_message}</p> : '.'}</p>
               
            </div>
            <div>
            <ol className="history">
            {this.state.history.map((his)=>{
                return (
                    <div className="history_copy_text">
                    <CopyToClipboard 
                    text={his}
                    onCopy={this.onHistoryButtonClick}>
                    <button className="history_copy_button">העתק</button>
                    </CopyToClipboard>
                    {`${his} ${this.state.history_copied_message ? `- ${this.state.history_copied_message}`: '' }`}
                    </div>
                )
            })}
            </ol>
            <p className='made-by'>made with ❤ by s1n.</p>
            </div>
            </div>
        );
    }
}

export default Form;