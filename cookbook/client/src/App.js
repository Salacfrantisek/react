import './App.css';
import React, {useRef, useState, createContext, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "react-bootstrap/Navbar";
import Header from "./components/Header";
import Button from "react-bootstrap/Button";
import RecipeGridList from "./components/layouts/RecipeGridList";
import UserContext from "./components/AuthProvider";



//todo odstranit
const cookbook = {
    name: "Studentská kuchyně"
};

const recipeList = [{
    "name": "Salát z naklíčené čočky",
    "description": "Mrkev, okurku a papriku nakrájejte na malé kostičky a dejte do větší mísy spolu s naklíčenou čočkou. Cibuli nakrájejte najemno a přidejte k zelenině. Přisypte nasekanou petrželku. V misce nebo hrníčku důkladně promíchejte lák z okurek, olivový olej a med. Zálivku nalijte do mísy a důkladně promíchejte. Na závěr dochuťte solí a pepřem.",
    "imgUri": "https://zachranjidlo.cz/wp-content/uploads/dsc02309-1-e1652694711486-1024x433-1200x500-c-default.jpg",
    "ingredients": [{
        "id": "c6ea4fb4d330d32b", "amount": 200, "unit": "g"
    }, {
        "id": "01ed1245cdfd005a", "amount": 1, "unit": "ks"
    }, {
        "id": "95ff7d609062d4db", "amount": 0.5, "unit": "ks"
    }, {
        "id": "73fd3db102b7803d", "amount": 0.5, "unit": "ks"
    }, {
        "id": "9416b19e1bd2cd11", "amount": 1, "unit": "ks"
    }, {
        "id": "426371a4bbc275f1", "amount": 1, "unit": "hrst"
    }, {
        "id": "e0e1a7f5ccef3dff", "amount": 3, "unit": "lžíce"
    }, {
        "id": "d8e6bbd4d6038494", "amount": 2, "unit": "lžíce"
    }, {
        "id": "defe5185b23ca985", "amount": 1, "unit": "lžíce"
    }, {
        "id": "3f702872fb8e99f8", "amount": 1, "unit": "špetka"
    }, {
        "id": "cd99517791018390", "amount": 1, "unit": "špetka"
    }],
    "id": "b6c21cf8807dd356"
}, {
    "name": "Ovesné placičky",
    "description": "Cibuli oloupejte a nastrouhejte nahrubo. Mrkev důkladně umyjte a nastrouhejte najemno spolu s česnekem. V míse smíchejte vločky, cibuli, mrkev, česnek a koření. Přidejte strouhanku a důkladně promíchejte, ideálně rukou tak, aby vznikla jednotná směs. Pokud je směs příliš suchá, přidejte trošku vody, pokud je příliš mokrá, přidejte trošku strouhanky. Na pánvi rozpalte olej, ze směsi vytvarujte malé placičky a smažte z obou stran dozlatova.",
    "imgUri": "https://zachranjidlo.cz/wp-content/uploads/dsc-0516-1-1024x480-1200x500-c-default.jpg",
    "ingredients": [{
        "id": "f9996cfda5568262", "amount": 2, "unit": "hrnky"
    }, {
        "id": "518aea069b179f29", "amount": 2, "unit": "ks"
    }, {
        "id": "01ed1245cdfd005a", "amount": 2, "unit": "ks"
    }, {
        "id": "157003980c0a437a", "amount": 4, "unit": "lžíce"
    }, {
        "id": "2220a6eb35e31dc6", "amount": 2, "unit": "ks"
    }, {
        "id": "0b9ccac3b2f733cc", "amount": 1, "unit": "lžička"
    }, {
        "id": "dfa4b721efe898a5", "amount": 1, "unit": "lžička"
    }, {
        "id": "97f5d8e88343e612", "amount": 1, "unit": "lžička"
    }, {
        "id": "3f702872fb8e99f8", "amount": 1, "unit": "lžička"
    }, {
        "id": "cd99517791018390", "amount": 0.25, "unit": "lžičky"
    }, {
        "id": "40d227ce8a379758", "amount": 100, "unit": "ml"
    }],
    "id": "854f2f3cb8954916"
}, {
    "name": "Barbecue burger ze zbylého kuřete",
    "description": "Rozehřejte troubu na 240 °C. Obrané drůbeží maso natrhejte na vlákna, zamíchejte s barbecue omáčkou a rozprostřete do pekáčku. Dejte do trouby a pečte asi 10 minut. Rozpůlené bulky opečte na rozpálené pánvi na sucho z obou stran. Limetu umyjte, nastrouhejte kůru, šťávu vymačkejte a obojí smíchejte s majonézou. Pomocí škrabky udělejte z mrkve tenké proužky. Přendejte je do misky, přidejte špetku soli a pepře a pár kapek limety a promíchejte. Začněte skládat burger. Obě půlky bulek pomažte limetovou majonézou. Na spodní polovinu bulky navrstvěte natrhaný koriandr, na plátky nasekanou chilli papričku, mrkvové proužky, tenká kolečka šalotky a plátek rajčete. Nakonec přidejte vrstvu zapečeného bbq kuřete a plátek cheddaru. Přiklopte vrchní polovinou bulky a podávejte.",
    "imgUri": "https://zachranjidlo.cz/wp-content/uploads/bbq-kure-burger-1024x493-1200x500-c-default.png",
    "ingredients": [{
        "id": "9bb6644a5520cf8e", "amount": 400, "unit": "g"
    }, {
        "id": "a6e8d310c6628d31", "amount": 4, "unit": "ks"
    }, {
        "id": "f6d6a4104a5194d9", "amount": 100, "unit": "g"
    }, {
        "id": "87dbea8746ecb15d", "amount": 1, "unit": "ks"
    }, {
        "id": "59a3f03b35e69690", "amount": 3, "unit": "snítka"
    }, {
        "id": "f34bba8dd7088dff", "amount": 80, "unit": "ml"
    }, {
        "id": "01ed1245cdfd005a", "amount": 1, "unit": "ks"
    }, {
        "id": "b08135ccef590fd6", "amount": 1, "unit": "ks"
    }, {
        "id": "9c0957e5273de89a", "amount": 1, "unit": "ks"
    }, {
        "id": "cfb695a5d686cb2e", "amount": 2, "unit": "ks"
    }, {
        "id": "5cfea498406de1b7", "amount": 2, "unit": "lžíce"
    }],
    "id": "1ae20af4cfa8efc4"
}, {
    "name": "Chřestová polévka",
    "description": "Ve velkém hrnci přiveďte k varu 1000 ml vody. Omytý chřest oloupejte, odlomte dřevnaté konce a dejte je pomalu vařit. Z chřestu odkrojte hlavičky a zbytek chřestu pokrájejte na 1 cm kousky. V hrnci rozehřejte 20 g másla a hlavičky na něm lehce opečte, dejte stranou. Na zbylém másle pomalu restujte nadrobno pokrájenou šalotku a prolisovaný stroužek česneku dosklovata. Přidejte pokrájené stonky chřestu a pomalu restujte dalších 5 minut. Přilijte vývar z chřestu a vařte 15 minut. Vše důkladně promixujte a vraťte do hrnce a vypněte plotýnku. V misce smíchejte žloutky s majonézou a vínem. Směs pomalu vlijte do hrnce s polévkou a za stálého míchání dokud polévka lehce nezhoustne. Lehce polévku přihřejte a dochuťte solí a citronovou šťávou. Polévku ozdobte opečenými hlavičkami chřestu a výhonky hrášku. Servírujte s opečenou bagetou.",
    "imgUri": "https://zachranjidlo.cz/wp-content/uploads/chrestpolevka-1024x427-1200x500-c-default.png",
    "ingredients": [{
        "id": "8df05c04dec4ad46", "amount": 500, "unit": "g"
    }, {
        "id": "6740ae2c9acfa794", "amount": 70, "unit": "g"
    }, {
        "id": "87dbea8746ecb15d", "amount": 2, "unit": "ks"
    }, {
        "id": "2220a6eb35e31dc6", "amount": 1, "unit": "ks"
    }, {
        "id": "88c04efef87fecae", "amount": 50, "unit": "ml"
    }, {
        "id": "7aea5d7072d9f488", "amount": 2, "unit": "ks"
    }, {
        "id": "21a3625a381c4cf5", "amount": 4, "unit": "lžíce"
    }, {
        "id": "86b1f4a7c798eb04", "amount": 1, "unit": "lžíce"
    }, {
        "id": "7c45f9808efc936a", "amount": 1, "unit": "lžíce"
    }, {
        "id": "3f702872fb8e99f8", "amount": 1, "unit": "špetka"
    }, {
        "id": "cd99517791018390", "amount": 1, "unit": "špetka"
    }, {
        "id": "53dae6e5a0076b15", "amount": 1, "unit": "ks"
    }],
    "id": "2dd281dff25fe765"
}, {
    "name": "Drůbeží paštika s vepřovými kousky",
    "description": "Játra důkladně očistěte. Odkrojky z vepřového rozmixujte do hladka. Přidejte očištěná játra, koření, víno, bylinky, sůl, pepř, česnek, šalotku, 100 g másla a rozmixujte do hladka. Rozmixovanou směsí naplňte menší zavařovací skleničky nebo hřbet vyložený folií. Vložte do pekáčku, podlijte asi 3 cm vody a dejte péct do trouby na 100 °C asi 50 minut. Mezitím si připravte bylinkové máslo na zalití paštiky. Máslo rozpusťte na mírném ohni a následně rozmixujte s medvědím česnekem (stačí polovina, zbytek použijte na ozdobu). Zkontrolujte paštiku. Správně upečená by měla být pěkně růžová. Pokud je hotová, zalijte ji zeleným máslem a dejte chladit na několik hodin, nejlépe do druhého dne. Podávejte s krajícem rozpečeného chleba a čerstvými listy medvědího česneku.",
    "imgUri": "https://zachranjidlo.cz/wp-content/uploads/pastika-1024x493-1200x500-c-default.png",
    "ingredients": [{
        "id": "778400b335f3cf0a", "amount": 150, "unit": "g"
    }, {
        "id": "0b3a78414e196585", "amount": 100, "unit": "g"
    }, {
        "id": "6740ae2c9acfa794", "amount": 200, "unit": "g"
    }, {
        "id": "2220a6eb35e31dc6", "amount": 1, "unit": "ks"
    }, {
        "id": "97f5d8e88343e612", "amount": 50, "unit": "g"
    }, {
        "id": "4a17d47da9503363", "amount": 4, "unit": "lžíce"
    }, {
        "id": "87dbea8746ecb15d", "amount": 1, "unit": "ks"
    }, {
        "id": "ce185eb2e7ad2e7c", "amount": 3, "unit": "snítka"
    }, {
        "id": "a088b01b2dc1bd5a", "amount": 0.5, "unit": "lžičky"
    }, {
        "id": "3f702872fb8e99f8", "amount": 1, "unit": "špetka"
    }, {
        "id": "cd99517791018390", "amount": 1, "unit": "špetka"
    }, {
        "id": "bc6da7a1358c36ca", "amount": 4, "unit": "plátky"
    }],
    "id": "a771ee4c1359b270"
}, {
    "name": "Cuketové závitky s chlebovým parmazánem",
    "description": "Ztvrdlý chleba nalámejte a nasekejte nožem najemno, podrťte v hmoždíři nebo rozmixujte. Směs vsypte na rozehřátou pánev a přidejte sůl, cukr a ocet. Za stálého míchání pražte 2 minuty. Přilijte olej a směs dále míchejte 3–5 minut, až „parmazán” zezlátne. Poté ho nechte vychladnout. Cukety nakrájejte podélně na tenké plátky (cca 0,5 cm, ne více). Plátky z obou stran lehce posolte a nechte je alespoň 15 minut “vypotit”. Plátky cukety osušte a na rozpálené pánvi s trochou olivového oleje opečte z každé strany dozlatova. Dle chuti můžete přidat čerstvý pepř. Cuketu nechejte zchladnout, každý plátek namažte tenkou vrstvou žervé a posypte chlebovým parmazánem. Na jeden konec plátku dejte pár lístků rukoly, bylinek či jiných natí tak, aby stonky ležely na okraji plátku a lístky na druhé straně trošku vyčnívaly. Srolujte ze strany, kde leží bylinky, do závitku a podávejte jako předkrm nebo jednohubku.",
    "imgUri": "https://zachranjidlo.cz/wp-content/uploads/zavitky-1024x493-1200x500-c-default.png",
    "ingredients": [{
        "id": "4a02c5f42ed2a50e", "amount": 100, "unit": "g"
    }, {
        "id": "3f702872fb8e99f8", "amount": 0.5, "unit": "lžičky"
    }, {
        "id": "a52eee7ee4336b50", "amount": 0.5, "unit": "lžičky"
    }, {
        "id": "c34d54075cd88e29", "amount": 0.5, "unit": "lžičky"
    }, {
        "id": "5cfea498406de1b7", "amount": 2, "unit": "lžíce"
    }, {
        "id": "0031332354e31780", "amount": 2, "unit": "ks"
    }, {
        "id": "f6928ce8390a5980", "amount": 200, "unit": "g"
    }, {
        "id": "97f5d8e88343e612", "amount": 1, "unit": "hrst"
    }, {
        "id": "3f702872fb8e99f8", "amount": 1, "unit": "špetka"
    }, {
        "id": "cd99517791018390", "amount": 1, "unit": "špetka"
    }],
    "id": "508200e97ac04f80"
}, {
    "name": "Focaccia s olejem ze sušených rajčat",
    "description": "Ve větší míse smíchejte vodu a droždí a nechejte pár minut stát, aby se droždí aktivovalo. Do mísy postupně přisypávejte mouku a sůl a míchejte, dokud nevznikne hladké těsto. Přikryjte utěrkou a nechejte v teple kynout alespoň 1 hodinu. Vykynuté těsto přendejte na pomoučenou plochu a rozdělte jej na dvě poloviny. Oba bochánky přendejte na plech vyložený pečícím papírem a rozprostřete do silnější placky. Pokapejte olejem, můžete přidat i kousky sušených rajčat, bylinky nebo pár oliv. Olej důkladně rozetřete pomocí rukou a prsty promačkejte, aby v placce vznikly mírné prohlubně. Posypejte hrubou solí a pečte na 250 °C asi 10-12 minut do zlatohněda.",
    "imgUri": "https://zachranjidlo.cz/wp-content/uploads/dsc02208-1024x426-1200x500-c-default.jpg",
    "ingredients": [{
        "id": "13490a01e0f59a28", "amount": 500, "unit": "g"
    }, {
        "id": "806c0d1dd61a7a08", "amount": 400, "unit": "ml"
    }, {
        "id": "3ac376e95dcbc246", "amount": 0.5, "unit": "ks"
    }, {
        "id": "3f702872fb8e99f8", "amount": 1, "unit": "lžíce"
    }, {
        "id": "af691554e6c7feed", "amount": 4, "unit": "lžíce"
    }],
    "id": "2b7dae44b479363a"
}, {
    "name": "Katalánské zeleninové karbanátky se slaninou",
    "description": "Brambory oloupejte, nakrájejte na kostky a uvařte v osolené vodě doměkka. Kapustu zbavte vnějších ovadlých listů, vnitřní nasekejte na nudličky. Česnek oloupejte a nakrájejte na tenké plátky. Z uzeniny odkrojte případnou kůži nebo sloupněte slupku a nakrájejte ji na silnější plátky (asi 3–5 mm). Jakmile jsou brambory uvařené, slijte polovinu vody, vsypte k nim kapustu, nechte ji 1 minutu spařit a slijte zbylou vodu. Brambory rozmačkejte šťouchadlem nebo vařečkou a promíchejte s kapustou. Na horké pánvi opečte plátky uzeniny dozlatova z obou stran. Opatrně ji vyjměte, ale vypečený tuk ponechte v pánvi. Ve vypečeném tuku orestujte česnek dozlatova. Přidejte brambory s kapustou a opečte je ze všech stran. Z bramborové směsi můžete tvořit placičky a opékat je dozlatova z obou stran. Podávejte s plátky uzeniny. Místo uzeniny můžete použít zbylé pečené maso, hodí se tučnější části jako bůček, krkovice, ale i řízek. Pokud maso nemá dostatek tuku, opečte ho na 1–2 lžících sádla.",
    "imgUri": "https://zachranjidlo.cz/wp-content/uploads/katalanske_karbanatky-1024x427-1200x500-c-default.png",
    "ingredients": [{
        "id": "9f02cb91fe08ee88", "amount": 500, "unit": "g"
    }, {
        "id": "0f98ae783ce9be76", "amount": 0.25, "unit": "hlávky"
    }, {
        "id": "bf0da9e7fe070b99", "amount": 200, "unit": "g"
    }, {
        "id": "3f702872fb8e99f8", "amount": 1, "unit": "špetka"
    }],
    "id": "f00a783bfd2de513"
}, {
    "name": "Francouzský rajčatový koláč",
    "description": "Rajčata nakrájejte na tlustší plátky, posolte z obou stran a nechte alespoň hodinu v pokojové teplotě, aby pustila část šťávy. Koláčovou formu vyložte pečícím papírem nebo vymažte máslem a vysypte moukou. Listové těsto rozválejte, vyložte jím formu a dno propíchejte vidličkou. Na těsto rovnoměrně rozetřete hořčici. Pokud jsou rajčata hodně šťavnatá, nebo jste neměli čas nechat pustit jejich šťávu, posypte hořčici trochou strouhanky. Na dno koláče rozprostřete plátky rajčat, pokapejte olivovým olejem a přidejte trošku soli a čerstvě namletého pepře. Koláč vložte do trouby rozehřáté na 220°C a pečte asi 35 minut, dokud okraje koláče nezezlátnou. Nechejte koláč mírně zchladnout, ozdobte jej lístky bazalky a podávejte ho ještě teplý či za studena.",
    "imgUri": "https://zachranjidlo.cz/wp-content/uploads/img_6491-1024x414-1200x500-c-default.jpg",
    "ingredients": [{
        "id": "cd363625e6b6df65", "amount": 300, "unit": "g"
    }, {
        "id": "b08135ccef590fd6", "amount": 5, "unit": "ks"
    }, {
        "id": "98a317455a114d54", "amount": 2, "unit": "lžíce"
    }, {
        "id": "157003980c0a437a", "amount": 2, "unit": "lžíce"
    }, {
        "id": "5cfea498406de1b7", "amount": 1, "unit": "lžíce"
    }, {
        "id": "3f702872fb8e99f8", "amount": 1, "unit": "špetka"
    }, {
        "id": "cd99517791018390", "amount": 1, "unit": "špetka"
    }],
    "id": "62cee1045b85cdda"
}, {
    "name": "Skořicové hranolky z chleba",
    "description": "Zbylý chleba nakrájejte na malé hranoly. Smíchejte rozkvedlaná vajíčka s mlékem a solí. Chleba obalte ve vajíčku a nechte ho trochu nasáknout. Na pánvi rozehřejte polovinu másla a postupně chleba ze všech stran dozlatova osmahněte. Ještě teplé hranolky obalte ve skořicovém cukru (cukr krupice smíchaný se skořicí) a naservírujte na talířku nebo v hezkém hrnečku. Skořicové hranolky můžete také ve zjednodušené podobě upéct v troubě. V tom případě přelijte rozpuštěné máslo přes pokrájené hranolky ze staršího chleba a důkladně rukama promíchejte. Zasypte je cukrem se skořicí a opět promíchejte tak, aby se cukr rovnoměrně distribuoval po celém povrchu chleba. Pečte na 180 °C dozlatova, přibližně 5 až 10 minut. Po vytažení z trouby je můžete ještě extra zasypat trochou skořice.",
    "imgUri": "https://zachranjidlo.cz/wp-content/uploads/sh7a0274-1-1024x527-1200x500-c-default.jpg",
    "ingredients": [{
        "id": "1eadc60f4d5bf8bf", "amount": 4, "unit": "plátky"
    }, {
        "id": "7e85150c34fd62eb", "amount": 2, "unit": "ks"
    }, {
        "id": "2ffb380763c16c97", "amount": 60, "unit": "ml"
    }, {
        "id": "34109b1b210e32ed", "amount": 30, "unit": "g"
    }, {
        "id": "3f702872fb8e99f8", "amount": 1, "unit": "špetka"
    }, {
        "id": "ea32fb839257568d", "amount": 1, "unit": "lžička"
    }, {
        "id": "6740ae2c9acfa794", "amount": 2, "unit": "lžíce"
    }],
    "id": "e6a2450d6d6cd747"
}];


//testovaci komponenta
function MyComponent() {
    return <div>ahoj</div>;
}

function App() {
    //UI consts
    const [showRecipesBool, setShowRecipes] = useState(false); //render receptu
    const [DarkSideBool, setDarkSide] = useState(false); //render zabavnych receptu
    //todo: Tlacitka na navbaru se pridaji az po zvoleni druhu receptu
    const [navButtons, setNavButtons] = useState(0); //0 - tlacitka neviditelna, 1 - tlacitka viditelna + sipka zpet na volbu druhu receptu


    //Consts for server communication
    const [listRecipeCall, setListRecipeCall] = useState({
        state: "pending",
    });

    //Consts for authentication
    const { toggleAuth, toggleAuthorization } = React.useState(true);


    useEffect(() => {
        fetch(`http://localhost:3000/recipe/list`, {
            method: "GET",
        }).then(async (response) => {
            const responseJson = await response.json();
            if (response.status >= 400) {
                setListRecipeCall({ state: "error", error: responseJson });
            } else {
                setListRecipeCall({ state: "success", data: responseJson });
            }
        });
    }, []);


    let showRecipes = () => {
        // Po kliknutí na tlačítko zmeni stav showRecipes na true
        setShowRecipes(!showRecipesBool);
        setNavButtons(1);
    };
    let showDarkRecipes = () => {
        setDarkSide(!DarkSideBool);
        setNavButtons(1);
    };


        //todo:na radku 309 odstranit alert - byl testovaci
        return (
            <div className={"App"}>
                if (navButtons === 1) {
                <Navbar fixed="top" expand={"sm"} className="p-4" bg="dark" variant="dark">
                </Navbar>
            }
                <div style={{margin: 60, marginTop: 100, color: "lightgrey"}}>
                    <Header cookbook={cookbook}/>
                </div>
                <div>
                    <Button variant="primary" onClick={showRecipes}>🌞 Casual vaření 🌞</Button>
                    {showRecipesBool && <RecipeGridList />}
                </div>
                <div style={{marginTop: 25}}>
                    <Button variant="dark" onClick={()=>{ alert(DarkSideBool); showDarkRecipes() }}>☠ Let me COOK! ☠</Button>
                    {DarkSideBool && <RecipeGridList />}
                </div>
                <br/>
                <div>
                    <Button onClick={toggleAuthorization} variant={"success"}>
                        Kliknutim se prihlaste - takovy zabezpeceni nema ani statni sprava
                    </Button>
                </div>
                <div className="Footer">
                    ©Nemám rád barvičky a celej frontend
                </div>
            </div>
        );

}

export default App;