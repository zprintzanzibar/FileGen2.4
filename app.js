const SCRIPT_URL = https://script.google.com/macros/s/AKfycbyP9TtyqM1vfOnUMaUkIStdHPhXx77fbzgMpnB8sp1SVqxm1oqyRW5wiCPge8kN13U-/exec;
fetch(`${SCRIPT_URL}?action=getPhones`)
.then(r=>r.json())
.then(data=>{
const list=document.getElementById("phoneList");
data.forEach(p=>{const o=document.createElement("option");o.value=p;list.appendChild(o);});
});
document.getElementById("woForm").onsubmit=async e=>{
e.preventDefault();
const params=new URLSearchParams({
action:"createWO",
category:category.value,
subcategory:subcategory.value,
client:client.value,
phone:phone.value,
description:description.value,
version:version.value
});
const res=await fetch(`${SCRIPT_URL}?${params}`);
const data=await res.json();
filename.value=data.filename;
labelLink.href=data.labelUrl;
result.hidden=false;
};
function copyFilename(){filename.select();document.execCommand("copy");}
