const bodyParser = require('body-parser');
const express = require('express');
const language = require('@google-cloud/language');
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Instantiates a client
const client = new language.LanguageServiceClient({
    credentials: {
  "type": "service_account",
  "project_id": "fake-news-detection-316008",
  "private_key_id": "35e26ae3b86b1ceb8025fc22bca5723c057528a0",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDOgSh4KP+EpC/N\nQ+jT+F1bfSrR+r23zYjcYzen85LLvYkuxg2Cz51CsRl/JiwgsmAZA9pEDtq1qd39\nijx56ImB5Rxxz3hZZIchCIopQui2Ii5ZFUzxxH7tAhNIpFiZZ8fb3W5FB7MErojH\nLvfhiKzDPREAGsA8BUqyjYg1vNkL1jHXbxM8qbT0cl18hW0NNWZ6PkKWqbjIZ3Ow\nFNWe03gkodOlyVfEX3hhRTsg3Q58ted2z5aYagemBImSYKdgqHPWh5zTnowaN2cP\n4Dv/n+EJBzWs+C2iBWFtBPbUCDxqEtO7H34mbJbxt6zQzG8tu+bG9rewbJV/EPUz\nGAdkAX3PAgMBAAECggEABAjpAgQHDg/pMTEI/Q9Gv7Ff409rYop9CJVVso3jSeDP\nq97Jx8sHrxRnw6C6zv69Ou/k1VyW8GK7yCbpzJX7DdMsrZqYpuJ8c2xHysuYYWqk\njjAI21Z0Bmx6dPplEsZA1O5sJ6QhXs+MM5wa0sjJW103llFvfRy7W2bBiQ9CDGWf\neb5Ei9jpd3I5TeDr7WocyJyebJPPdOvCOiqJxqAkGRgZyfGxqOqYbSY5H04ErUXG\nMHAIB1J2hHj7/aLTF3fRW5NIu2ElNcPtD5RWRPBqLPJkB005hE808irhiCTi7n4W\n72J52mdo0zvOZD/NUwteyOPdUOQhcxAiEkh/SvIDUQKBgQD67vGjqGw9im5Ph8Sq\ngwvtyT2BvowFmZlOlDMOQn/D9MFfUShanDZhDzQ02prLqTlYHNDCu5Xw26vS/5Mc\n/f9SZQ7HPNLl/vkYKccZvtq8MTQda1PFcyrcluNUh+BLDlRh705+7U7Ey9O7N8vC\naWlMB9I/c6uDzKz137dZ+V8efwKBgQDSrJCSCubv/tHS9WhVUK0uLPlZWGtDR8Ce\n4FoksQKw118g2q4QIJzHAMSzM4m8ntEic6QrdSuv1/Dcb0DzL5lFjO7TqDaW1Is2\ngduWjWdB9ZmFrNmFw8AtmH11T18Bk4SU4zmbyTUqfCFlCp6ZNIo3iIiwdteXmxVN\nHK9uc96YsQKBgQCTDVAiPmMgNW2rwb6oxh9JfDNFQ2s/JOJIwGSjKKlDJr3jo+Xo\nI79iZcyMZMduLn9ieZCFbfTSr4kkH44Q4XCs0ng0nhphmmhTlrgNCGGbA6Ks0ubG\nwVUO7IXQVchFc+JTejAgBeWxQlmUT4BjL+77FWJKuPh8RofdlvsWCSOK9QKBgQCD\nyPbWpIM59ckDkggl9kWe8Ps57JmMiMHxoJ5C/YeVX+ReBO2FoSDxS4XAI6kxmJdy\nWayEktM1OHuvKNkURt42J6buN/eN+n7rJehbETFajWvvtuSLTJxW6WDxlSj1L3Zs\nPIe47/CWFvg84Ju9cqRTgNEgsfbDG3wDtMH48fp4wQKBgANWggLW22Z27gA0+ZR2\nc9xSff4lIoA5UIchkx7Cp+uVkKVSwTaJciv/Ix6+qOyU+vdYzcgMdT1CCqD8fCVo\n+T3MzDYoYMieyb7jljk69WPKkl+r0y2LxB7iSSfucjyhtQtUEHolMZ3XagzVOtbl\ntmBiGZpk2GlKDN9iaa9CwREA\n-----END PRIVATE KEY-----\n",
  "client_email": "nlp-library@fake-news-detection-316008.iam.gserviceaccount.com",
  "client_id": "104515553547921778867",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/nlp-library%40fake-news-detection-316008.iam.gserviceaccount.com"
}
});



app.post('/', function (req, res) {


    const document = {
        content: JSON.stringify(req.body),
        type: 'PLAIN_TEXT',
    };
    client
        .analyzeSentiment({document: document})
        .then(results => {
            const sentiment = results[0].documentSentiment;

            console.log(`document content: ${document.content}`);
            console.log(`document sentiment: ${document.sentiment}`);
            console.log(`Sentiment magnitude: ${sentiment.magnitude}`);

             //console.log('hi on api');
            let response = {
                "status": 200,
                "mag": sentiment.magnitude
            };
            response.mag = sentiment.magnitude;
            res.send(response)
        })



        .catch(err => {
            console.error('ERROR:', err);
        });
});

app.listen(3000, function () {
    console.log('Server Started on Port 3000...');
});

