import axios from 'axios';
import React , {Component}from 'react';
 
export class CusFeedbacksPage extends Component 
{
    constructor(props) {
        super(props)
 
        this.state = {
            fileContent: "",
            wordCloud: ""
        }
    }
 
    handleSubmit = (event) => 
    {
        event.preventDefault();
        let text = "This is deep! I liked Pizza at your place..";
        console.log("In function")
        axios({
            method: 'POST',
            url: 'https://textvis-word-cloud-v1.p.rapidapi.com/v1/textToCloud',
            headers: {
              'content-type': 'application/json',
              'x-rapidapi-key': 'f870c70cccmsh264557ff26f7acep1588fdjsn9d67394fc992',
              'x-rapidapi-host': 'textvis-word-cloud-v1.p.rapidapi.com'
            },
            data: {
              text: 'This is deep! I liked Pizza at your place.',
              scale: 0.5,
              width: 400,
              height: 400,
              colors: ['#375E97', '#FB6542', '#FFBB00', '#3F681C'],
              font: 'Tahoma',
              use_stopwords: true,
              language: 'en',
              uppercase: false
            }
        }).then((response) => {
            console.log("Here")
            console.log('I am here',response.data);
            this.setState({wordCloud: response.data});
            if (this.validateForm()) {
                alert("Details Successfully Saved!!");
            }
        }).catch((error) => {
            console.log("Eroor")
        })
    }
 
    render() {
 
        return ( 
            <div className="row justify-content-center" >
                <div className="col-xl-3 col-md-4 col-sm-6 col-12">
                    <h1 >Feedback</h1>
                    <div className="mt-4">
                        <form>
                            <p>Enter your feedback:</p>
                            <input
                            type="text"
                            />
                            <button type="submit" className="btn btn-primary" onClick={this.handleSubmit} placeholder="submit">Submit</button>
                            <img src={this.state.wordCloud}/>
                        </form>
                    </div>
                </div>
        </div> );
    }
}
 
export default CusFeedbacksPage;