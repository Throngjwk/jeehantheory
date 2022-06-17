import { ExponentialCost, FreeCost, LinearCost } from "./api/Costs";
import { Localization } from "./api/Localization";
import { BigNumber } from "./api/BigNumber";
import { theory } from "./api/Theory";
import { Utils } from "./api/Utils";

var id = "Jeehan2561?";
var name = "Jeehan Theory";
var description = "[hhh this game.]";
var authors = "Throngjwk";
var version = 1;

var currency;
var c1, c2;
var c1Exp, c2Exp;

var achievement1, achievement2;
var chapter1, chapter2;

var init = () => {
    currency = theory.createCurrency();

    ///////////////////
    // Regular Upgrades

    // c1
    {
        let getDesc = (level) => "c_1=" + getC1(level).toString(0);
        c1 = theory.createUpgrade(0, currency, new FirstFreeCost(new ExponentialCost(15, Math.log2(2))));
        c1.getDescription = (_) => Utils.getMath(getDesc(c1.level));
        c1.getInfo = (amount) => Utils.getMathTo(getDesc(c1.level), getDesc(c1.level + amount));
    }

    // c2
    {
        let getDesc = (level) => "c_2=2^{" + level + "}";
        let getInfo = (level) => "c_2=" + getC2(level).toString(0);
        c2 = theory.createUpgrade(1, currency, new ExponentialCost(5, Math.log2(10)));
        c2.getDescription = (_) => Utils.getMath(getDesc(c2.level));
        c2.getInfo = (amount) => Utils.getMathTo(getInfo(c2.level), getInfo(c2.level + amount));
    }

    // c3
    {
        let getDesc = (level) => "c_3=3^{" + level + "}";
        let getInfo = (level) => "c_3=" + getC3(level).toString(0);
        c3 = theory.createUpgrade(2, currency, new ExponentialCost(5, Math.log2(10)));
        c3.getDescription = (_) => Utils.getMath(getDesc(c3.level));
        c3.getInfo = (amount) => Utils.getMathTo(getInfo(c3.level), getInfo(c3.level + amount));
    }

    // c4
    {
        let getDesc = (level) => "c_4=what^{" + level + "}";
        let getInfo = (level) => "c_4=" + getC4(level).toString(0);
        c4 = theory.createUpgrade(3, currency, new ExponentialCost("1e1000", Math.log2(1)));
        c4.getDescription = (_) => Utils.getMath(getDesc(c4.level));
        c4.getInfo = (amount) => Utils.getMathTo(getInfo(c4.level), getInfo(c4.level + amount));
        c4.maxLevel = 1;
    }

    // c5
    {
        let getDesc = (level) => "c_5=2^{" + level + "}";
        let getInfo = (level) => "c_5=" + getC5(level).toString(0);
        c5 = theory.createUpgrade(4, currency, new ExponentialCost("ee6942000", Math.log2(10)));
        c5.getDescription = (_) => Utils.getMath(getDesc(c5.level));
        c5.getInfo = (amount) => Utils.getMathTo(getInfo(c5.level), getInfo(c5.level + amount));
        c5.maxLevel = 2;
    }

    /////////////////////
    // Permanent Upgrades
    theory.createPublicationUpgrade(0, currency, 1e10);
    theory.createBuyAllUpgrade(1, currency, 1e13);
    theory.createAutoBuyerUpgrade(2, currency, 1e30);

    ///////////////////////
    //// Milestone Upgrades
    theory.setMilestoneCost(new LinearCost(25, 25));

    {
        c1Exp = theory.createMilestoneUpgrade(0, 3);
        c1Exp.description = Localization.getUpgradeIncCustomExpDesc("c_1", "0.05");
        c1Exp.info = Localization.getUpgradeIncCustomExpInfo("c_1", "0.05");
        c1Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }

    {
        c2Exp = theory.createMilestoneUpgrade(1, 3);
        c2Exp.description = Localization.getUpgradeIncCustomExpDesc("c_2", "0.05");
        c2Exp.info = Localization.getUpgradeIncCustomExpInfo("c_2", "0.05");
        c2Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }
    
    /////////////////
    //// Achievements
    function InfinitysSlow(num) {
        if (num == 0) {
            return 1e308;
        }
        if (num == 1) {
            return 1e38 * 1e38;
        }
        if (num == 2) {
            return 1e38;
        }
    }

    achievement1 = theory.createAchievement(0, "Start Playing", "wow wow!", () => true);
    achievement2 = theory.createAchievement(1, "Hundred", "100 this game.", () => currency.value > 100);
    achievement3 = theory.createAchievement(2, "1000", "3 digits anymore", () => currency.value > 1000);
    achievement4 = theory.createAchievement(3, "69420", "lol", () => currency.value > 69420);
    achievement5 = theory.createAchievement(4, "Yes me", "hh", () => currency.value > 1e7);
    achievement6 = theory.createAchievement(5, "Trillion", "wow wow!", () => currency.value > 1e12);
    achievement7 = theory.createAchievement(6, "1Q", "1e18 i think", () => currency.value > 1e18);
    achievement8 = theory.createAchievement(7, "10Sp", "ten septillion", () => currency.value > 1e25);
    achievement9 = theory.createAchievement(8, "1UDc", "myable undecillion.", () => currency.value > 1e36);
    achievement10 = theory.createAchievement(9, "await", "wow wow!", () => currency.value > 1e57);
    achievement11 = theory.createAchievement(10, "e80", "while spent", () => currency.value > 1e80);
    achievement12 = theory.createAchievement(11, "Poyy", "aaa", () => currency.value > 1e115);
    achievement13 = theory.createAchievement(12, "wait wait", "wow wow!", () => currency.value > 1e136);
    achievement14 = theory.createAchievement(13, "i dosent", "discord plz!", () => currency.value > 1e160);
    achievement15 = theory.createAchievement(14, "you win!", "or do you!??!?!??!?", () => currency.value > InfinitysSlow(0));
    achievement16 = theory.createAchievement(15, "I Booster Power", "when do spect this game.", () => c4.level > 0);
    achievement17 = theory.createAchievement(16, "Go to |mposibble |_|pgrade", "what", () => c5.level > 0);

    ///////////////////
    //// Story chapters
    chapter1 = theory.createStoryChapter(0, "\"|\"|-|[- [-|\\||>", "ajajajjajajajj \naiaajjijssijsijijsi", () => c5.level > 0);

    updateAvailability();
}

var updateAvailability = () => {
    c2Exp.isAvailable = c1Exp.level > 0;
}

var tick = (elapsedTime, multiplier) => {
    let dt = BigNumber.from(elapsedTime * multiplier);
    let bonus = theory.publicationMultiplier;
    currency.value += dt * bonus * getC1(c1.level) * getC2(c2.level) * getC3(c3.level);
                                   
}

var getPrimaryEquation = () => {
    let result = "\\dot{\\rho} = c_1";

    if (c1Exp.level == 1) result += "^{1.05}";
    if (c1Exp.level == 2) result += "^{1.1}";
    if (c1Exp.level == 3) result += "^{1.15}";

    result += "c_2";

    if (c2Exp.level == 1) result += "^{1.05}";
    if (c2Exp.level == 2) result += "^{1.1}";
    if (c2Exp.level == 3) result += "^{1.15}";

    return result;
}

var getSecondaryEquation = () => theory.latexSymbol + "=\\max\\rho";
var getPublicationMultiplier = (tau) => tau / 2;
var getPublicationMultiplierFormula = (symbol) => "\\frac{{" + symbol + "}^{0.164}}{3}";
var getTau = () => currency.value;
var get2DGraphValue = () => currency.value.sign * (BigNumber.ONE + currency.value.abs()).log10().toNumber();

var getC1 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0);
var getC2 = (level) => BigNumber.TWO.pow(level);
var getC3 = (level) => BigNumber.THREE.pow(level);
// Go Speed up!
var getC4 = (level) => BigNumber.from(10).pow(1e80 * level);
// Percent Win
var getC5 = (level) => BigNumber.TWO.pow(level);
// Cannot use exponent.
var getC1Exponent = (level) => BigNumber.from(1 + 0.05 * level);
var getC2Exponent = (level) => BigNumber.from(1 + 0.05 * level);

init();