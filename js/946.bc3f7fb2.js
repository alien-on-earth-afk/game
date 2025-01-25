"use strict";(self["webpackChunkgaming_website"]=self["webpackChunkgaming_website"]||[]).push([[946],{1875:function(e,s,a){a.d(s,{A:function(){return u}});var t=a(6768);const i={class:"spinner-container"};function o(e,s){return(0,t.uX)(),(0,t.CE)("div",i,s[0]||(s[0]=[(0,t.Lk)("div",{class:"spinner"},null,-1)]))}var n=a(1241);const l={},r=(0,n.A)(l,[["render",o],["__scopeId","data-v-0368a4a9"]]);var u=r},1451:function(e,s,a){a.d(s,{A:function(){return h}});var t=a(6768);const i=["aria-label"],o={key:0},n={key:1};function l(e,s,a,l,r,u){return(0,t.uX)(),(0,t.CE)("button",{onClick:s[0]||(s[0]=(...s)=>e.toggleTheme&&e.toggleTheme(...s)),class:"theme-toggle","aria-label":e.isDark?"Switch to light mode":"Switch to dark mode"},[e.isDark?((0,t.uX)(),(0,t.CE)("span",o,"🌞")):((0,t.uX)(),(0,t.CE)("span",n,"🌙"))],8,i)}var r=a(782),u={name:"ThemeToggle",computed:{...(0,r.aH)({isDark:e=>e.theme.isDark})},methods:{...(0,r.PY)(["toggleTheme"])}},d=a(1241);const c=(0,d.A)(u,[["render",l],["__scopeId","data-v-0685e4c1"]]);var h=c},4946:function(e,s,a){a.r(s),a.d(s,{default:function(){return S}});var t=a(6768),i=a(4232),o=a(5130);const n={class:"signup-container"},l={class:"signup-box"},r={class:"form-group"},u={class:"validation-rules"},d={class:"icon"},c={class:"icon"},h={class:"icon"},p={class:"form-group"},m={class:"form-group"},g={class:"password-input"},v=["type"],k={key:0,class:"form-group"},w={class:"otp-controls"},b=["disabled"],f=["disabled"],y={key:1},L=["disabled"],C={key:1},T={class:"login-link"};function P(e,s,a,P,_,O){const E=(0,t.g2)("ThemeToggle"),U=(0,t.g2)("loading-spinner"),X=(0,t.g2)("router-link");return(0,t.uX)(),(0,t.CE)("div",n,[(0,t.bF)(E),(0,t.Lk)("div",l,[s[18]||(s[18]=(0,t.Lk)("h2",null,"Create Account",-1)),_.message?((0,t.uX)(),(0,t.CE)("div",{key:0,class:(0,i.C4)(["message",_.message.type])},(0,i.v_)(_.message.text),3)):(0,t.Q3)("",!0),(0,t.Lk)("form",{onSubmit:s[8]||(s[8]=(0,o.D$)(((...e)=>O.handleSignup&&O.handleSignup(...e)),["prevent"])),autocomplete:"off"},[(0,t.Lk)("div",r,[s[12]||(s[12]=(0,t.Lk)("label",{for:"username"},"Username",-1)),(0,t.bo)((0,t.Lk)("input",{id:"username",type:"text","onUpdate:modelValue":s[0]||(s[0]=e=>_.username=e),placeholder:"Choose a username",onInput:s[1]||(s[1]=(...e)=>O.validateUsername&&O.validateUsername(...e)),autocomplete:"off",required:""},null,544),[[o.Jo,_.username]]),(0,t.Lk)("div",u,[(0,t.Lk)("div",{class:(0,i.C4)(["rule",{valid:_.rules.alphanumeric,invalid:!_.rules.alphanumeric}])},[(0,t.Lk)("span",d,(0,i.v_)(_.rules.alphanumeric?"✓":"✗"),1),s[9]||(s[9]=(0,t.eW)(" Only letters, numbers, and underscore "))],2),(0,t.Lk)("div",{class:(0,i.C4)(["rule",{valid:_.rules.length,invalid:!_.rules.length}])},[(0,t.Lk)("span",c,(0,i.v_)(_.rules.length?"✓":"✗"),1),s[10]||(s[10]=(0,t.eW)(" At least 6 characters long "))],2),(0,t.Lk)("div",{class:(0,i.C4)(["rule",{valid:_.rules.available,invalid:!1===_.rules.available}])},[(0,t.Lk)("span",h,(0,i.v_)(null===_.rules.available?"?":_.rules.available?"✓":"✗"),1),s[11]||(s[11]=(0,t.eW)(" Username is available "))],2)])]),(0,t.Lk)("div",p,[s[13]||(s[13]=(0,t.Lk)("label",{for:"email"},"Email",-1)),(0,t.bo)((0,t.Lk)("input",{id:"email",type:"email","onUpdate:modelValue":s[2]||(s[2]=e=>_.email=e),placeholder:"Enter your email",autocomplete:"off",required:""},null,512),[[o.Jo,_.email]])]),(0,t.Lk)("div",m,[s[14]||(s[14]=(0,t.Lk)("label",{for:"password"},"Password",-1)),(0,t.Lk)("div",g,[(0,t.bo)((0,t.Lk)("input",{id:"password",type:_.showPassword?"text":"password","onUpdate:modelValue":s[3]||(s[3]=e=>_.password=e),placeholder:"Create a strong password",autocomplete:"new-password",required:""},null,8,v),[[o.hp,_.password]]),(0,t.Lk)("button",{type:"button",class:"toggle-password",onClick:s[4]||(s[4]=e=>_.showPassword=!_.showPassword),"aria-label":"Toggle password visibility"},(0,i.v_)(_.showPassword?"👁️":"👁️‍🗨️"),1)])]),_.showOTP?((0,t.uX)(),(0,t.CE)("div",k,[s[15]||(s[15]=(0,t.Lk)("label",{for:"otp"},"Verification Code",-1)),(0,t.bo)((0,t.Lk)("input",{id:"otp",ref:"otpInput",type:"text","onUpdate:modelValue":s[5]||(s[5]=e=>_.otp=e),placeholder:"Enter 6-digit code",maxlength:"6",pattern:"\\d{6}",required:""},null,512),[[o.Jo,_.otp]]),(0,t.Lk)("div",w,[(0,t.Lk)("button",{type:"button",class:"resend-otp-btn",onClick:s[6]||(s[6]=(...e)=>O.resendOTP&&O.resendOTP(...e)),disabled:_.cooldown>0}," Resend OTP "+(0,i.v_)(_.cooldown>0?`(${_.cooldown}s)`:""),9,b)])])):(0,t.Q3)("",!0),_.showOTP?((0,t.uX)(),(0,t.CE)("button",{key:2,type:"submit",disabled:!_.otp||_.isLoading,class:"primary-button"},[_.isLoading?((0,t.uX)(),(0,t.Wv)(U,{key:0})):((0,t.uX)(),(0,t.CE)("span",C,"Create Account"))],8,L)):((0,t.uX)(),(0,t.CE)("button",{key:1,type:"button",onClick:s[7]||(s[7]=(...e)=>O.requestOTP&&O.requestOTP(...e)),disabled:!O.isFormValid||_.isLoading,class:"primary-button"},[_.isLoading?((0,t.uX)(),(0,t.Wv)(U,{key:0})):((0,t.uX)(),(0,t.CE)("span",y,"Send Verification Code"))],8,f)),(0,t.Lk)("p",T,[s[17]||(s[17]=(0,t.eW)(" Already have an account? ")),(0,t.bF)(X,{to:"/login"},{default:(0,t.k6)((()=>s[16]||(s[16]=[(0,t.eW)("Log In")]))),_:1})])],32)])])}a(4114);var _=a(782),O=a(1875),E=a(1451),U={name:"SignupPage",components:{LoadingSpinner:O.A,ThemeToggle:E.A},data(){return{username:"",email:"",password:"",otp:"",showOTP:!1,showPassword:!1,isLoading:!1,cooldown:0,message:null,rules:{alphanumeric:!1,length:!1,available:null}}},computed:{isFormValid(){return this.username&&this.email&&this.password&&this.rules.alphanumeric&&this.rules.length&&this.rules.available}},methods:{...(0,_.i0)({signup:"auth/signup",verifySignupOTP:"auth/verifySignupOTP",checkUsername:"auth/checkUsername"}),async validateUsername(){if(this.rules.available=null,this.rules.alphanumeric=/^[a-zA-Z0-9_]+$/.test(this.username),this.rules.length=this.username.length>=6,this.rules.alphanumeric&&this.rules.length)try{const e=await this.checkUsername(this.username);this.rules.available=e.available}catch(e){console.error("Username check error:",e),this.rules.available=!1}},startCooldown(){this.cooldown=60;const e=setInterval((()=>{this.cooldown--,this.cooldown<=0&&clearInterval(e)}),1e3)},async requestOTP(){if(this.isFormValid){this.isLoading=!0;try{await this.signup({username:this.username,email:this.email,password:this.password}),this.showOTP=!0,this.startCooldown(),this.$nextTick((()=>{this.$refs.otpInput?.focus()}))}catch(e){this.message={type:"error",text:e.message||"Failed to send verification code"}}finally{this.isLoading=!1}}},async resendOTP(){if(!(this.cooldown>0)){this.isLoading=!0;try{await this.signup({username:this.username,email:this.email,password:this.password}),this.startCooldown(),this.message={type:"success",text:"New verification code sent"}}catch(e){this.message={type:"error",text:e.message||"Failed to resend verification code"}}finally{this.isLoading=!1}}},async handleSignup(){if(this.otp){this.isLoading=!0;try{await this.verifySignupOTP({email:this.email,otp:this.otp}),this.$router.push("/login")}catch(e){this.message={type:"error",text:e.message||"Invalid verification code"}}finally{this.isLoading=!1}}}}},X=a(1241);const A=(0,X.A)(U,[["render",P],["__scopeId","data-v-19eb5d21"]]);var S=A}}]);
//# sourceMappingURL=946.bc3f7fb2.js.map