require("@babel/polyfill");
var $knI9B$axios = require("axios");


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}


const $70af9284e599e604$export$596d806903d1f59e = async (email, password)=>{
    //   axios
    //     .post('http://127.0.0.1:7000/api/v1/users/login', {
    //       email,
    //       password,
    //     })
    //     .then(res => console.log(res))
    //     .catch(err => console.log(err));
    try {
        const res = await (0, ($parcel$interopDefault($knI9B$axios)))({
            method: "POST",
            url: "http://127.0.0.1:7000/api/v1/users/login",
            data: {
                email: email,
                password: password
            }
        });
        if (res.data.status === "success") {
            alert("Hello there");
            window.setTimeout(()=>{
                location.assign("/");
            }, 1500);
        }
    } catch (err) {
        alert(err.response.data.message);
    }
};


console.log("Just hello");
const $d0f7ce18c37ad6f6$var$loginForm = document.querySelector(".form");
const $d0f7ce18c37ad6f6$var$email = document.getElementById("email").value;
const $d0f7ce18c37ad6f6$var$password = document.getElementById("password").value;
if ($d0f7ce18c37ad6f6$var$loginForm) $d0f7ce18c37ad6f6$var$loginForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    (0, $70af9284e599e604$export$596d806903d1f59e)($d0f7ce18c37ad6f6$var$email, $d0f7ce18c37ad6f6$var$password);
});


//# sourceMappingURL=bundle.js.map
