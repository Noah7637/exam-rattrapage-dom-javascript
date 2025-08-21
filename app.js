let image = document.querySelector(".illustration");
let nomPlat = document.querySelector(".card-content p");
let regime = document.getElementById("regime")
let origine = document.getElementById("origine")
let rechercheInput = document.querySelector("form input");
let youtube = document.querySelector("a")
let bouton = document.querySelector("button");
let instruction = document.querySelector("li")
let nbrIngredient = 1;
let formulaire = document.getElementById("form")
let ingredient
let quantite
let table_ingredient = document.querySelector("table")
let tbody = document.querySelector("tbody")
let tr = document.querySelectorAll("table tbody tr")
let a_yt = document.querySelector(".link")

bouton.addEventListener("click", async(event) => {
event.preventDefault();
formulaire.style.display = 'none'
let recherche = rechercheInput.value;
let lien = `https://www.themealdb.com/api/json/v1/1/search.php?s=${recherche}`;
let reponse =await fetch(lien)
let plat =await reponse.json()
plat = plat.meals[0]

nomPlat.textContent = plat.strMeal
regime.textContent = plat.strCategory
origine.textContent = plat.strArea

if (plat.strYoutube != "") {youtube.textContent = plat.strYoutube
	youtube.href = plat.strYoutube
} 
else{
	a_yt.href.innerHTML = `
								<p
									class="link"
									
								>
									There is no link available for this recipe.
								</p>`
}
 

image.style = `background: center / cover no-repeat url('${plat.strMealThumb}');`

tbody.innerHTML = ""

while(nbrIngredient <= 20) {
    quantite = plat[`strMeasure${nbrIngredient}`]
    ingredient = plat[`strIngredient${nbrIngredient}`]

if(ingredient != "" && ingredient != null && ingredient != undefined) {
    tbody.innerHTML += `<tr>
	<th scope="row">
		<span class="stone-600-text">${ingredient}</span>
	</th>
	<td>
		<span class="brown-800-text bold">${quantite}</span>
	</td>
</tr>`
}
    
    nbrIngredient++
    
}

let etape = plat.strInstructions.split("\r\n")
let nbrEtape = 0
let ulInstruction = document.getElementById("ulInstruction")
ulInstruction.innerHTML = ""


while (nbrEtape < 100) {
etape[nbrEtape] = etape[nbrEtape].replace(/^step\s*/i, "")
etape[nbrEtape] = etape[nbrEtape].replace(/^\d+\s*/, "")
etape[nbrEtape] = etape[nbrEtape].replace(/^\./, "")
etape[nbrEtape] = etape[nbrEtape].replace(/^-/, "")
if (etape[nbrEtape] != "" && etape[nbrEtape] != null && etape[nbrEtape] != undefined && etape[nbrEtape].length >= 7
) {
    console.log(etape[nbrEtape])
    ulInstruction.innerHTML += `<li>
							<span class="stone-600-text text-preset-body">
								${etape[nbrEtape]}
							</span>
						</li>`
}
nbrEtape++
}
})