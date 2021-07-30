import React, {useState} from 'react';
import axios from 'axios';

const CusFeedbacksPage = () => {

    const [data, setData] = useState({
        feedbackData: "",
        wordCloud: "",
        image: ""
    })

    const onClick =  (event) => 
    {
        event.preventDefault();
        axios.post("https://uya4nc1v2k.execute-api.us-east-1.amazonaws.com/default/wordCloudFunctionGroup17",JSON.stringify({data: data.feedbackData})).then((response) => {

            let wordCloudData = ""
            response.data.Items.forEach((element, index) => {
                wordCloudData = wordCloudData + element.feedbackData;
                wordCloudData = wordCloudData + " ";
            });
 
            data.wordCloud= wordCloudData;

            onSubmit();
            alert('Successfully stored data into database');
        }).catch((error) => {
            console.log("Eroor")
        })
    }

    const onSubmit = () => 
    {
        let text = data.wordCloud;
        axios({
            method: 'POST',
            url: 'https://textvis-word-cloud-v1.p.rapidapi.com/v1/textToCloud',
            headers: {
              'content-type': 'application/json',
              'x-rapidapi-key': 'f870c70cccmsh264557ff26f7acep1588fdjsn9d67394fc992',
              'x-rapidapi-host': 'textvis-word-cloud-v1.p.rapidapi.com'
            },
            data: {
              text: text,
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
            data.image = response.data;
            console.log('image', data.image);
        }).catch((error) => {
            console.log("Eroor")
        })
    }

    const handleChange = (e) => {
        console.log(e.target)
        setData({
            feedbackData: e.target.value
        })
    }

    return ( 
        <div className="row justify-content-center" >
            <div className="col-xl-3 col-md-4 col-sm-6 col-12">
                <h1 >Feedback</h1>
                <div className="mt-4">
                    <form>
                        <p>Enter your feedback:</p>
                        <input
                        type="text"
                        id = "feedback"
                        name = "feedback"
                        onChange={handleChange}
                        />
                        <button type="reset" className="btn btn-primary" placeholder="reset">Reset</button>
                        <button type="submit" className="btn btn-primary" onClick={onClick} placeholder="submit">Submit</button>
                        <img src={data.image}/>
                    </form>
                </div>
            </div>
    </div> );
}

export default CusFeedbacksPage