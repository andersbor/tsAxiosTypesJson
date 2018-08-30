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

// more advanced object, including nested objects (and double nested objects)
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
then(function (response: AxiosResponse<IUser[]>): void {
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
        result += "<li>" + user.username + " " + user.email + " " + user.phone + "</li>";
    });
    result += "</ol>";
    outputElement.innerHTML = result;
}

function addToDom(response: AxiosResponse<IUser[]>): void {
    response.data.forEach((user: IUser) => {
        let buttonElement: HTMLButtonElement = document.createElement<"button">("button");
        buttonElement.innerHTML = user.id + " " + user.name;
        buttonElement.className = "collapsible";
        outputElement.appendChild(buttonElement);

        let divElement : HTMLDivElement = document.createElement<"div">("div");
        divElement.innerHTML = user.email + " " + user.address.city + " " +  user.company.name;
        divElement.className = "content";
        divElement.style.display = "none";
        outputElement.appendChild(divElement);

        buttonElement.addEventListener("click", ()=> {
            console.log("clicked " + user.name);
            console.log(divElement.style.display);
            if (divElement.style.display === "block") {
                divElement.style.display = "none";
            } else {
                divElement.style.display = "block";
            }
        });
    });
}
