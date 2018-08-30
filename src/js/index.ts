import axios, {
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
    AxiosInstance,
    AxiosAdapter,
    Cancel,
    CancelToken,
    CancelTokenSource,
    Canceler
} from "../../node_modules/axios";

// https://github.com/axios/axios/blob/master/test/typescript/axios.ts
// attributes from REST service http://jsonplaceholder.typicode.com/comments
// simple object
interface IComment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

// more advanced object
interface IUser {
    id: number;
    name: string;
    username: string;
    email: string;
    address: IAddress;
    phone: string;
    company: { name: string; catchPhrase: string; bs: string };
}

interface IAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: { lat: string; long: string };
}

let outputElement: HTMLDivElement = <HTMLDivElement>document.getElementById("content");

/*
axios.get<IComment>("http://jsonplaceholder.typicode.com/comments").
    then(function (response: AxiosResponse<IComment[]>): void {
        // outputElement.innerHTML = JSON.stringify(response.data);
        let result: string = "<ol>";
        response.data.forEach((comment: IComment) => {
            console.log(comment.email);
            result += "<li>" + comment.name + " " + comment.email + "</li>";
        });
        result += "</ol>";
        outputElement.innerHTML = result;
    })
    .catch(function (error: AxiosError): void {
        console.log(JSON.stringify(error));
    });
*/

axios.get<IUser>("http://jsonplaceholder.typicode.com/users").
then(function (response: AxiosResponse<IComment[]>): void {
   // buildAndShowLongHtmlString(response);
   addToDom(response);
})
.catch(function (error: AxiosError): void {
    console.log(JSON.stringify(error));
});


function buildAndShowLongHtmlString(response: AxiosResponse<IComment[]>): void {
    let result: string = "<ol>";
    response.data.forEach((user: IUser) => {
        console.log(user.email);
        result += "<li>" + user.name + " " + user.email + " " + user.address.city + "</li>";
    });
    result += "</ol>";
    outputElement.innerHTML = result;
}

function addToDom(response: AxiosResponse<IComment[]>): void {
    response.data.forEach((user: IUser) => {
        let buttonElement: HTMLButtonElement = document.createElement<"button">("button");
        buttonElement.innerHTML = user.id + " " + user.name;
        outputElement.appendChild(buttonElement);

        let divElement : HTMLDivElement = document.createElement<"div">("div");
        divElement.innerHTML = user.name + " " + user.email + " " + user.address.city;
        outputElement.appendChild(divElement);

        buttonElement.addEventListener("click", ()=> {
            console.log("clicked " + user.name);
        })
    });
}
