import logo from "./assets/logo.png";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import {
    BookOpen,
    CheckCircle,
    Edit2,
    Save,
    X,
    Plus,
    Lock,
    Unlock,
} from "lucide-react";

interface PaystackResponse {
    reference: string;
    status: string;
    message: string;
    trans: string;
    transaction: string;
    trxref: string;
}

declare global {
    interface Window {
        PaystackPop: {
            setup: (config: {
                key: string;
                email: string;
                amount: number;
                currency: string;
                reference: string;
                onClose: () => void;
                callback: (response: PaystackResponse) => void;
            }) => { openIframe: () => void };
        };
    }
}

type BibleVersions = {
    KJV: string;
    NKJV: string;
    NIV: string;
    ESV: string;
    AMP: string;
    NLT: string;
};

type ScriptureDB = Record<string, BibleVersions>;

const initialScriptureDB: ScriptureDB = {
  "Numbers 11:4-6": {
    "KJV": "4 And the mixt multitude that was among them fell a lusting: and the children of Israel also wept again, and said, Who shall give us flesh to eat? 5 We remember the fish, which we did eat in Egypt freely; the cucumbers, and the melons, and the leeks, and the onions, and the garlick: 6 But now our soul is dried away: there is nothing at all, beside this manna, before our eyes.",
    "NKJV": "4 Now the mixed multitude who were among them yielded to intense craving; so the children of Israel also wept again and said: 'Who will give us meat to eat? 5 We remember the fish which we ate freely in Egypt, the cucumbers, the melons, the leeks, the onions, and the garlic; 6 but now our whole being is dried up; there is nothing at all except this manna before our eyes!'",
    "NIV": "4 The rabble with them began to crave other food, and again the Israelites started wailing and said, 'If only we had meat to eat! 5 We remember the fish we ate in Egypt at no cost—also the cucumbers, melons, leeks, onions and garlic. 6 But now we have lost our appetite; we never see anything but this manna!'",
    "ESV": "4 Now the rabble that was among them had a strong craving. And the people of Israel also wept again and said, 'Oh that we had meat to eat! 5 We remember the fish we ate in Egypt that cost nothing, the cucumbers, the melons, the leeks, the onions, and the garlic. 6 But now our strength is dried up, and there is nothing at all but this manna to look at.'",
    "AMP": "4 The mixed multitude [of non-Israelites] who were among them had greedy desires; and the Israelites wept again and said, 'Who will give us meat to eat? 5 We remember the fish we ate freely and without cost in Egypt, the cucumbers, melons, leeks, onions, and garlic. 6 But now our appetite is gone; there is nothing at all [in the way of food] to be seen but this manna.'",
    "NLT": "4 Then the foreign rabble who were traveling with the Israelites began to crave the good things of Egypt. And the people of Israel also began to complain. 'Oh, for some meat!' they exclaimed. 5 'We remember the fish we used to eat for free in Egypt. And we had all the cucumbers, melons, leeks, onions, and garlic we wanted. 6 But now our appetites are gone. All we ever see is this manna!'"
  },
  "1 Corinthians 10:12": {
    "KJV": "12 Wherefore let him that thinketh he standeth take heed lest he fall.",
    "NKJV": "12 Therefore let him who thinks he stands take heed lest he fall.",
    "NIV": "12 So, if you think you are standing firm, be careful that you don’t fall!",
    "ESV": "12 Therefore let anyone who thinks that he stands take heed lest he fall.",
    "AMP": "12 Therefore let the one who thinks he stands [firm, immune to temptation, being overconfident and self-righteous], take care that he does not fall [into sin and condemnation].",
    "NLT": "12 If you think you are standing strong, be careful not to fall."
  },
  "John 3:19": {
    "KJV": "19 And this is the condemnation, that light is come into the world, and men loved darkness rather than light, because their deeds were evil.",
    "NKJV": "19 And this is the condemnation, that the light has come into the world, and men loved darkness rather than light, because their deeds were evil.",
    "NIV": "19 This is the verdict: Light has come into the world, but people loved darkness instead of light because their deeds were evil.",
    "ESV": "19 And this is the judgment: the light has come into the world, and people loved the darkness rather than the light because their works were evil.",
    "AMP": "19 This is the judgment [that is, the cause for indictment, the test by which people are judged, the basis for the sentence]: the Light has come into the world, and people loved the darkness rather than the Light, for their deeds were evil.",
    "NLT": "19 And the judgment is based on this fact: God’s light came into the world, but people loved the darkness more than the light, for their actions were evil."
  },
  "Numbers 11:10-15": {
    "KJV": "10 Then Moses heard the people weep throughout their families, every man in the door of his tent: and the anger of the LORD was kindled greatly; Moses also was displeased. 11 And Moses said unto the LORD, Wherefore hast thou afflicted thy servant? and wherefore have I not found favour in thy sight, that thou layest the burden of all this people upon me? 12 Have I conceived all this people? have I begotten them, that thou shouldest say unto me, Carry them in thy bosom, as a nursing father beareth the sucking child, unto the land which thou swarest unto their fathers? 13 Whence should I have flesh to give unto all this people? for they weep unto me, saying, Give us flesh, that we may eat. 14 I am not able to bear all this people alone, because it is too heavy for me. 15 And if thou deal thus with me, kill me, I pray thee, out of hand, if I have found favour in thy sight; and let me not see my wretchedness.",
    "NKJV": "10 Then Moses heard the people weeping throughout their families, everyone at the door of his tent; and the anger of the LORD was greatly aroused; Moses also was displeased. 11 So Moses said to the LORD, 'Why have You afflicted Your servant? And why have I not found favor in Your sight, that You have laid the burden of all these people on me? 12 Did I conceive all these people? Did I beget them, that You should say to me, \"Carry them in your bosom, as a guardian carries a nursing child,\" to the land which You swore to their fathers? 13 Where am I to get meat to give to all these people? For they weep all over me, saying, \"Give us meat, that we may eat.\" 14 I am not able to bear all these people alone, because the burden is too heavy for me. 15 If You treat me like this, please kill me here and now—if I have found favor in Your sight—and do not let me see my wretchedness!'",
    "NIV": "10 Moses heard the people of every family wailing at the entrance to their tents. The LORD became exceedingly angry, and Moses was troubled. 11 He asked the LORD, 'Why have you brought this trouble on your servant? What have I done to displease you that you put the burden of all these people on me? 12 Did I conceive all these people? Did I give them birth? Why do you tell me to carry them in my arms, as a nurse carries an infant, to the land you promised on oath to their ancestors? 13 Where can I get meat for all these people? They keep wailing to me, \"Give us meat to eat!\" 14 I cannot carry all these people by myself; the burden is too heavy for me. 15 If this is how you are going to treat me, please go ahead and kill me—if I have found favor in your eyes—and do not let me face my own ruin.'",
    "ESV": "10 Moses heard the people weeping throughout their clans, everyone at the door of his tent. And the anger of the LORD blazed hotly, and Moses was displeased. 11 Moses said to the LORD, 'Why have you dealt ill with your servant? And why have I not found favor in your sight, that you lay the burden of all this people on me? 12 Did I conceive all this people? Did I give them birth, that you should say to me, \"Carry them in your bosom, as a nurse carries a nursing child,\" to the land that you swore to give their fathers? 13 Where am I to get meat to give to all this people? For they weep before me and say, \"Give us meat, that we may eat.\" 14 I am not able to carry all this people alone; the burden is too heavy for me. 15 If you will treat me like this, kill me at once, if I find favor in your sight, that I may not see my wretchedness.'",
    "AMP": "10 Now Moses heard the people weeping throughout their families, each man at the doorway of his tent; and the anger of the LORD blazed hotly, and Moses was displeased. 11 So Moses said to the LORD, 'Why have You been so hard on Your servant? And why have I not found favor in Your sight, that You have laid the burden of all these people on me? 12 Was it I who conceived all these people? Was it I who gave birth to them, that You should say to me, \"Carry them in your arms as a nurse carries the nursing infant,\" to the land which You swore to their fathers? 13 Where am I to get meat to give to all these people? For they weep before me and say, \"Give us meat so that we may eat.\" 14 I am not able to carry all these people alone, because the burden is too heavy for me. 15 So if this is the way You are going to deal with me, please kill me immediately—if I have found favor in Your sight—and do not let me see my wretchedness.'",
    "NLT": "10 Moses heard all the families standing in the doorways of their tents whining, and the LORD became extremely angry. Moses was also very aggravated. 11 And Moses said to the LORD, 'Why are you treating me, your servant, so harshly? Have mercy on me! What did I do to deserve the burden of all these people? 12 Did I give birth to them? Did I bring them into the world? Why did you tell me to carry them in my arms like a mother carries a nursing baby? How can I carry them to the land you swore to give their ancestors? 13 Where am I supposed to get meat for all these people? They keep whining to me, saying, \"Give us meat to eat!\" 14 I can’t carry all these people by myself! The load is far too heavy! 15 If this is how you intend to treat me, just go ahead and kill me. Do me a favor and spare me this misery!'"
  },
  "Numbers 11:6": {
    "KJV": "6 But now our soul is dried away: there is nothing at all, beside this manna, before our eyes.",
    "NKJV": "6 but now our whole being is dried up; there is nothing at all except this manna before our eyes!",
    "NIV": "6 But now we have lost our appetite; we never see anything but this manna!",
    "ESV": "6 But now our strength is dried up, and there is nothing at all but this manna to look at.",
    "AMP": "6 But now our appetite is gone; there is nothing at all [in the way of food] to be seen but this manna.",
    "NLT": "6 But now our appetites are gone. All we ever see is this manna!"
  },
  "Numbers 11:33": {
    "KJV": "33 And while the flesh was yet between their teeth, ere it was chewed, the wrath of the LORD was kindled against the people, and the LORD smote the people with a very great plague.",
    "NKJV": "33 But while the meat was still between their teeth, before it was chewed, the wrath of the LORD was aroused against the people, and the LORD struck the people with a very great plague.",
    "NIV": "33 But while the meat was still between their teeth and before it could be consumed, the anger of the LORD burned against the people, and he struck them with a severe plague.",
    "ESV": "33 While the meat was yet between their teeth, before it was consumed, the anger of the LORD was kindled against the people, and the LORD struck down the people with a very great plague.",
    "AMP": "33 While the meat was still between their teeth, before it was chewed, the anger of the LORD blazed against the people, and the LORD struck the people with a very severe plague.",
    "NLT": "33 But while they were gorging themselves on the meat—while it was still in their mouths—the anger of the LORD blazed against the people, and he struck them with a severe plague."
  },
  "Matthew 7:21": {
    "KJV": "21 Not every one that saith unto me, Lord, Lord, shall enter into the kingdom of heaven; but he that doeth the will of my Father which is in heaven.",
    "NKJV": "21 Not everyone who says to Me, ‘Lord, Lord,’ shall enter the kingdom of heaven, but he who does the will of My Father in heaven.",
    "NIV": "21 Not everyone who says to me, ‘Lord, Lord,’ will enter the kingdom of heaven, but only the one who does the will of my Father who is in heaven.",
    "ESV": "21 Not everyone who says to me, ‘Lord, Lord,’ will enter the kingdom of heaven, but the one who does the will of my Father who is in heaven.",
    "AMP": "21 Not everyone who says to Me, ‘Lord, Lord,’ will enter the kingdom of heaven, but only he who does the will of My Father who is in heaven.",
    "NLT": "21 Not everyone who calls out to me, ‘Lord! Lord!’ will enter the Kingdom of Heaven. Only those who actually do the will of my Father in heaven will enter."
  },
  "Job 1:6": {
    "KJV": "6 Now there was a day when the sons of God came to present themselves before the LORD, and Satan came also among them.",
    "NKJV": "6 Now there was a day when the sons of God came to present themselves before the LORD, and Satan also came among them.",
    "NIV": "6 One day the angels came to present themselves before the LORD, and Satan also came with them.",
    "ESV": "6 Now there was a day when the sons of God came to present themselves before the LORD, and Satan also came among them.",
    "AMP": "6 Now there was a day when the sons of God (angels) came to present themselves before the LORD, and Satan (adversary, accuser) also came among them.",
    "NLT": "6 One day the members of the heavenly court came to present themselves before the LORD, and the Accuser, Satan, came with them."
  },
  "Job 2:1": {
    "KJV": "1 Again there was a day when the sons of God came to present themselves before the LORD, and Satan came also among them to present himself before the LORD.",
    "NKJV": "1 Again there was a day when the sons of God came to present themselves before the LORD, and Satan came also among them to present himself before the LORD.",
    "NIV": "1 On another day the angels came to present themselves before the LORD, and Satan also came with them to present himself before him.",
    "ESV": "1 Again there was a day when the sons of God came to present themselves before the LORD, and Satan also came among them to present himself before the LORD.",
    "AMP": "1 Again there was a day when the sons of God (angels) came to present themselves before the LORD, and Satan (adversary, accuser) also came among them to present himself before the LORD.",
    "NLT": "1 One day the members of the heavenly court came again to present themselves before the LORD, and the Accuser, Satan, came with them."
  },
  "Zechariah 3:1-2": {
    "KJV": "1 And he shewed me Joshua the high priest standing before the angel of the LORD, and Satan standing at his right hand to resist him. 2 And the LORD said unto Satan, The LORD rebuke thee, O Satan; even the LORD that hath chosen Jerusalem rebuke thee: is not this a brand plucked out of the fire?",
    "NKJV": "1 Then he showed me Joshua the high priest standing before the Angel of the LORD, and Satan standing at his right hand to oppose him. 2 And the LORD said to Satan, 'The LORD rebuke you, Satan! The LORD who has chosen Jerusalem rebuke you! Is this not a brand plucked from the fire?'",
    "NIV": "1 Then he showed me Joshua the high priest standing before the angel of the LORD, and Satan standing at his right side to accuse him. 2 The LORD said to Satan, 'The LORD rebuke you, Satan! The LORD, who has chosen Jerusalem, rebuke you! Is not this man a burning stick snatched from the fire?'",
    "ESV": "1 Then he showed me Joshua the high priest standing before the angel of the LORD, and Satan standing at his right hand to accuse him. 2 And the LORD said to Satan, 'The LORD rebuke you, O Satan! The LORD who has chosen Jerusalem rebuke you! Is not this a brand plucked from the fire?'",
    "AMP": "1 Then [the guiding angel] showed me Joshua the high priest standing before the Angel of the LORD, and Satan standing at Joshua’s right hand to be his adversary and to accuse him. 2 And the LORD said to Satan, 'The LORD rebuke you, Satan! Even the LORD, who [now and ever] has chosen Jerusalem, rebuke you! Is this not a log snatched and rescued from the fire?'",
    "NLT": "1 Then the angel showed me Jeshua the high priest standing before the angel of the LORD. The Accuser, Satan, was there at the angel’s right hand, making accusations against Jeshua. 2 And the LORD said to Satan, 'I, the LORD, reject your accusations, Satan. Yes, the LORD, who has chosen Jerusalem, rebukes you. This man is like a burning stick that has been snatched from the fire.'"
  },
  "Matthew 15:8": {
    "KJV": "8 This people draweth nigh unto me with their mouth, and honoureth me with their lips; but their heart is far from me.",
    "NKJV": "8 ‘These people draw near to Me with their mouth, And honor Me with their lips, But their heart is far from Me.",
    "NIV": "8 ‘These people honor me with their lips, but their hearts are far from me.",
    "ESV": "8 “‘This people honors me with their lips, but their heart is far from me;",
    "AMP": "8 ‘These people honor Me with their lips, But their heart is far away from Me.",
    "NLT": "8 ‘These people honor me with their lips, but their hearts are far from me."
  },
  "2 Timothy 3:5": {
    "KJV": "5 Having a form of godliness, but denying the power thereof: from such turn away.",
    "NKJV": "5 having a form of godliness but denying its power. And from such people turn away!",
    "NIV": "5 having a form of godliness but denying its power. Have nothing to do with such people.",
    "ESV": "5 having the appearance of godliness, but denying its power. Avoid such people.",
    "AMP": "5 holding to a form of [outward] godliness (religion), although they have denied its power [for their conduct nullifies their claim of faith]. Avoid such people and keep far away from them.",
    "NLT": "5 They will act religious, but they will reject the power that could make them godly. Stay away from people like that!"
  },
  "Romans 8:5-8": {
    "KJV": "5 For they that are after the flesh do mind the things of the flesh; but they that are after the Spirit the things of the Spirit. 6 For to be carnally minded is death; but to be spiritually minded is life and peace. 7 Because the carnal mind is enmity against God: for it is not subject to the law of God, neither indeed can be. 8 So then they that are in the flesh cannot please God.",
    "NKJV": "5 For those who live according to the flesh set their minds on the things of the flesh, but those who live according to the Spirit, the things of the Spirit. 6 For to be carnally minded is death, but to be spiritually minded is life and peace. 7 Because the carnal mind is enmity against God; for it is not subject to the law of God, nor indeed can be. 8 So then, those who are in the flesh cannot please God.",
    "NIV": "5 Those who live according to the flesh have their minds set on what the flesh desires; but those who live in accordance with the Spirit have their minds set on what the Spirit desires. 6 The mind governed by the flesh is death, but the mind governed by the Spirit is life and peace. 7 The mind governed by the flesh is hostile to God; it does not submit to God's law, nor can it do so. 8 Those who are in the realm of the flesh cannot please God.",
    "ESV": "5 For those who live according to the flesh set their minds on the things of the flesh, but those who live according to the Spirit set their minds on the things of the Spirit. 6 For to set the mind on the flesh is death, but to set the mind on the Spirit is life and peace. 7 For the mind that is set on the flesh is hostile to God, for it does not submit to God's law; indeed, it cannot. 8 Those who are in the flesh cannot please God.",
    "AMP": "5 For those who are living according to the flesh set their minds on the things of the flesh [which gratify the body], but those who are living according to the Spirit, [set their minds on] the things of the Spirit [His will and purpose]. 6 Now the mind of the flesh is death [both now and forever—because it pursues sin]; but the mind of the Spirit is life and peace [the spiritual well-being that comes from walking with God—now and forever]; 7 the mind of the flesh [with its sinful pursuits] is actively hostile to God. It does not submit itself to God’s law, since it cannot, 8 and those who are in the flesh [living a life that caters to sinful appetites and impulses] cannot please God.",
    "NLT": "5 Those who are dominated by the sinful nature think about sinful things, but those who are controlled by the Holy Spirit think about things that please the Spirit. 6 So letting your sinful nature control your mind leads to death. But letting the Spirit control your mind leads to life and peace. 7 For the sinful nature is always hostile to God. It never did obey God’s laws, and it never will. 8 That’s why those who are still under the control of their sinful nature can never please God."
  },
  "Galatians 5:16-17": {
    "KJV": "16 This I say then, Walk in the Spirit, and ye shall not fulfil the lust of the flesh. 17 For the flesh lusteth against the Spirit, and the Spirit against the flesh: and these are contrary the one to the other: so that ye cannot do the things that ye would.",
    "NKJV": "16 I say then: Walk in the Spirit, and you shall not fulfill the lust of the flesh. 17 For the flesh lusts against the Spirit, and the Spirit against the flesh; and these are contrary to one another, so that you do not do the things that you wish.",
    "NIV": "16 So I say, walk by the Spirit, and you will not gratify the desires of the flesh. 17 For the flesh desires what is contrary to the Spirit, and the Spirit what is contrary to the flesh. They are in conflict with each other, so that you are not to do whatever you want.",
    "ESV": "16 But I say, walk by the Spirit, and you will not gratify the desires of the flesh. 17 For the desires of the flesh are against the Spirit, and the desires of the Spirit are against the flesh, for these are opposed to each other, to keep you from doing the things you want to do.",
    "AMP": "16 But I say, walk habitually in the [Holy] Spirit [seek Him and be responsive to His guidance], and then you will certainly not carry out the desire of the sinful nature [which responds impulsively without regard for God and His precepts]. 17 For the sinful nature has its desire which is opposed to the Spirit, and the [desire of the] Spirit opposes the sinful nature; for these [two, the sinful nature and the Spirit] are in direct opposition to each other [continually in conflict], so that you [as believers] do not always do whatever [good things] you want to do.",
    "NLT": "16 So I say, let the Holy Spirit guide your lives. Then you won’t be doing what your sinful nature craves. 17 The sinful nature wants to do evil, which is just the opposite of what the Spirit wants. And the Spirit gives us desires that are the opposite of what the sinful nature desires. These two forces are constantly fighting each other, so you are not free to carry out your good intentions."
  },
  "Numbers 11:34": {
    "KJV": "34 And he called the name of that place Kibrothhattaavah: because there they buried the people that lusted.",
    "NKJV": "34 So he called the name of that place Kibroth Hattaavah, because there they buried the people who had yielded to craving.",
    "NIV": "34 Therefore the place was named Kibroth Hattaavah, because there they buried the people who had craved other food.",
    "ESV": "34 Therefore the name of that place was called Kibroth-hattaavah, because there they buried the people who had the craving.",
    "AMP": "34 So they named that place Kibroth-hattaavah [the graves of greediness], because there they buried the people who had been greedy for more.",
    "NLT": "34 So that place was called Kibroth-hattaavah (which means “graves of gluttony”) because there they buried the people who had craved meat from Egypt."
  },
  "Numbers 11:4": {
    "KJV": "4 And the mixt multitude that was among them fell a lusting: and the children of Israel also wept again, and said, Who shall give us flesh to eat?",
    "NKJV": "4 Now the mixed multitude who were among them yielded to intense craving; so the children of Israel also wept again and said: 'Who will give us meat to eat?'",
    "NIV": "4 The rabble with them began to crave other food, and again the Israelites started wailing and said, 'If only we had meat to eat!'",
    "ESV": "4 Now the rabble that was among them had a strong craving. And the people of Israel also wept again and said, 'Oh that we had meat to eat!'",
    "AMP": "4 The mixed multitude [of non-Israelites] who were among them had greedy desires; and the Israelites wept again and said, 'Who will give us meat to eat?'",
    "NLT": "4 Then the foreign rabble who were traveling with the Israelites began to crave the good things of Egypt. And the people of Israel also began to complain. 'Oh, for some meat!' they exclaimed."
  },
  "Hebrews 13:5": {
    "KJV": "5 Let your conversation be without covetousness; and be content with such things as ye have: for he hath said, I will never leave thee, nor forsake thee.",
    "NKJV": "5 Let your conduct be without covetousness; be content with such things as you have. For He Himself has said, 'I will never leave you nor forsake you.'",
    "NIV": "5 Keep your lives free from the love of money and be content with what you have, because God has said, 'Never will I leave you; never will I forsake you.'",
    "ESV": "5 Keep your life free from love of money, and be content with what you have, for he has said, 'I will never leave you nor forsake you.'",
    "AMP": "5 Let your character [your moral essence, your inner nature] be free from the love of money [shun greed—be financially ethical], being content with what you have; for He has said, 'I will never [under any circumstances] desert you [nor give you up nor leave you without support, nor will I in any degree leave you helpless] nor will I forsake or let you down or relax My hold on you [assuredly not]!'",
    "NLT": "5 Don’t love money; be satisfied with what you have. For God has said, 'I will never fail you. I will never abandon you.'"
  },
  "2 Corinthians 6:14": {
    "KJV": "14 Be ye not unequally yoked together with unbelievers: for what fellowship hath righteousness with unrighteousness? and what communion hath light with darkness?",
    "NKJV": "14 Do not be unequally yoked together with unbelievers. For what fellowship has righteousness with lawlessness? And what communion has light with darkness?",
    "NIV": "14 Do not be yoked together with unbelievers. For what do righteousness and wickedness have in common? Or what fellowship can light have with darkness?",
    "ESV": "14 Do not be unequally yoked with unbelievers. For what partnership has righteousness with lawlessness? Or what fellowship has light with darkness?",
    "AMP": "14 Do not be unequally bound together with unbelievers [do not make mismatched alliances with them, inconsistent with your faith]. For what partnership can righteousness have with lawlessness? Or what fellowship can light have with darkness?",
    "NLT": "14 Don’t team up with those who are unbelievers. How can righteousness be a partner with wickedness? How can light live with darkness?"
  },
  "Numbers 33:55-56": {
    "KJV": "55 But if ye will not drive out the inhabitants of the land from before you; then it shall come to pass, that those which ye let remain of them shall be pricks in your eyes, and thorns in your sides, and shall vex you in the land wherein ye dwell. 56 Moreover it shall come to pass, that I shall do unto you, as I thought to do unto them.",
    "NKJV": "55 But if you do not drive out the inhabitants of the land from before you, then it shall be that those whom you let remain shall be irritants in your eyes and thorns in your sides, and they shall harass you in the land where you dwell. 56 Moreover it shall be that I will do to you as I thought to do to them.",
    "NIV": "55 But if you do not drive out the inhabitants of the land, those you allow to remain will become barbs in your eyes and thorns in your sides. They will give you trouble in the land where you will live. 56 And then I will do to you what I plan to do to them.",
    "ESV": "55 But if you do not drive out the inhabitants of the land from before you, then those of them whom you let remain shall be as barbs in your eyes and thorns in your sides, and they shall trouble you in the land where you dwell. 56 And I will do to you as I thought to do to them.",
    "AMP": "55 But if you do not drive out the inhabitants of the land from before you, then those you let remain [of them] will be like thorns in your eyes and thorns in your sides, and they will trouble you in the land in which you live. 56 And as I planned to do to them, so I will do to you.",
    "NLT": "55 But if you fail to drive out the people who live in the land, those who remain will be like splinters in your eyes and thorns in your sides. They will harass you in the land where you live. 56 And I will do to you what I had planned to do to them."
  },
  "Isaiah 32:10": {
    "KJV": "10 Many days and years shall ye be troubled, ye careless women: for the vintage shall fail, the gathering shall not come.",
    "NKJV": "10 In a year and some days you will be troubled, you complacent women; For the vintage will fail, the gathering will not come.",
    "NIV": "10 In little more than a year you who feel secure will tremble; the grape harvest will fail, and the harvest of fruit will not come.",
    "ESV": "10 In little more than a year you will shudder, you complacent women; for the grape harvest fails, the fruit harvest will not come.",
    "AMP": "10 In little more than a year you will tremble, you complacent women; for the vintage has ended, and the harvest will not come.",
    "NLT": "10 In a little more than a year, you careless ones will suddenly begin to care. For your fruit crops will fail, and the harvest will never take place."
  },
  "2 Corinthians 2:11": {
    "KJV": "11 Lest Satan should get an advantage of us: for we are not ignorant of his devices.",
    "NKJV": "11 lest Satan should take advantage of us; for we are not ignorant of his devices.",
    "NIV": "11 in order that Satan might not outwit us. For we are not unaware of his schemes.",
    "ESV": "11 so that we would not be outwitted by Satan; for we are not ignorant of his designs.",
    "AMP": "11 to keep Satan from taking advantage of us; for we are not ignorant of his schemes.",
    "NLT": "11 so that Satan will not outsmart us. For we are familiar with his evil schemes."
  },






};





const SundaySchoolApp = () => {
    const [showPaymentGate, setShowPaymentGate] = useState(true);
    const [isPaid, setIsPaid] = useState(false);
    const [activeTab, setActiveTab] = useState("intro");
    const [darkMode, setDarkMode] = useState(true);
    const [fontSize, setFontSize] = useState(16);
    const [loading, setLoading] = useState(false);
    const [appLoading, setAppLoading] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [scriptureDB, setScriptureDB] =
        useState<ScriptureDB>(initialScriptureDB);
    const [selectedVerse, setSelectedVerse] = useState<string | null>(null);
    const [bibleVersion, setBibleVersion] =
        useState<keyof BibleVersions>("KJV");
    const [showVerseModal, setShowVerseModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [newVerse, setNewVerse] = useState<{
        reference: string;
        versions: BibleVersions;
    }>({
        reference: "",
        versions: { KJV: "", NKJV: "", NIV: "", ESV: "", AMP: "", NLT: "" },
    });
    const [verseLoading, setVerseLoading] = useState(false);
    
    const [editingContent, setEditingContent] = useState<string | null>(null);

    type SubPoint = { 
        title: string; 
        content: string; 
        scripture?: string
     };
    type LessonPoint = {
        title: string;
        content: string;
        scriptures: string[];
        subPoints: SubPoint[];
    };
    type ContentData = {
    lessonDate: string;
    lessonTitle: string;
    memoryVerse: string;
    memoryVerseRef: string;
    introduction: string;
    introScriptures: string[];
    lessonIntroScriptures: string[];
    aims: string;
    objectives: string;
    objectiveScriptures?: string[]; // Added optionally to prevent breaking existing data
    lessonIntro: string;
    lessonPoints: LessonPoint[];
    conclusion: string;
    conclusionScriptures: string[];
    prayerPoints: string[];
};

const [contentData, setContentData] = useState<ContentData>({
    lessonDate: "August 2, 2026", 
    lessonTitle: "INFLUENCE OF THE MIX MULTITUDES PART 2",

    memoryVerse:
        "And this is the condemnation, that light is come into the world, and men loved darkness rather than light, because their deeds were evil - John 3:19",
    memoryVerseRef: "John 3:19", 

    introScriptures: ["Numbers 11:4-6", "Numbers 11:10-15", "Numbers 11:33"],

    introduction:
        "We live in a world where light and darkness contend with one another and the advertisment of darkness seems to be more appealing to mankind. Don't take side with people because their ideas seem good and your feelings supports their cravings but humble yourself and support the righteous course of the Lord according to the Holy scriptures. The Lord wants you to stand with Him and not against Him - 1 Cor. 10:12.",

    aims:
        "To reveal Satan's scheme and motive against God's children.",

    objectives:
        "That God's children may escape the wrath and damnation of God.",
    
    lessonIntro:
        "God's provision of Manna was satisfactory to the Jews until the Mix Multitude began to point out to them that everything was wrong with it. This similar action occurred in Eden as the first parents hearkened to strange Satan who found everything that God gave them to be wrong. Their agitation brought a new deal but also calamity, where many dies according to verse 34. Let us consider more on this lesson.",
        
    lessonIntroScriptures: ["Numbers 11:4-6", "Numbers 11:10-15", "Numbers 11:33", "Numbers 11:34"],
    
    lessonPoints: [
        {
            title: "THE CARELESS CATCHES THE FLU",
            content:
                "The scheme and the actions of the mix multitude is highly contagious that only the careful believers can escape it. They will open your eyes to what they see other than what God requires you to see. They will entice and motivate you to join them or begin your own journey of rebellion towards God as in our text - Numbers 11:4, 1 Cor. 10:12, Isa. 32:10",
            scriptures: ["Numbers 11:4", "1 Corinthians 10:12", "Isaiah 32:10"],
            subPoints: [],
        },
        {
            title: "THE INSATIABLE WANTS OF MAN",
            content:
                "It is true that man is never satisfied with what he has or receives. This same congregation had God's protection from all the plaques in Egypt. All the silver and gold including the best clothings from all the Egyptian were given to them by God. They received other acts of God including miraculous supply of water which no other nation has ever enjoyed. The manna was one of the numerous provisions of God to them yet they joined unbelievers to rebel against a loving God who is busy blessing them through His servant. If this is your present position then repent quickly before calamnity will befall you. Hebrews 13:5",
            scriptures: ["Hebrews 13:5"],
            subPoints: [],
        },
        {
            title: "LOST OF APETITE FOR GOD'S DEALING:",
            content:
                "In verse 6, they claim to to have lost appetite for God's provision and desired what the mix multitude showed them. Your union with the mix multitude will always create loss of joy in the things of God Because their influence is based on their interest - 2 Corinthians 6:14",
            scriptures: ["2 Corinthians 6:14","Numbers 11:6"],
            subPoints: [],
        },
    ],

    conclusion:
        "Don't allow such evil company to sweep you away from the presence and blessings of God to destruction. Numbers 33:55-56.",

    conclusionScriptures: ["Numbers 33:55-56"],

    prayerPoints: [
        "Lord, open my eyes to discern and separate myself from evil associations and the subtle influence of the mixed multitude that draws hearts away from You.",
        "Father, grant me a heart of true contentment and gratitude for Your daily provisions, and deliver me from the spirit of insatiable desires and murmuring.",
        "Oh Lord, preserve my spiritual appetite for Your word and presence; never let the enticing promises of the world rob me of my joy in You.",
        "Holy Spirit, give me the grace to stand firm in righteousness and light, so that I will never compromise my faith or follow the crowd into destruction."
    ]
});



    const formatScriptureText = (text: string) => {
        const parts = text.split(/(\d+)/);
        return parts.map((part, index) => {
            if (/^\d+$/.test(part)) {
                return (
                    <strong key={index} className="font-bold">
                        {part}
                    </strong>
                );
            }
            return <span key={index}>{part}</span>;
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setAppLoading(false), 500);
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
        return () => clearInterval(interval);
    }, []);

    const toggleTheme = () => setDarkMode(!darkMode);
    const adjustFontSize = (delta: number) =>
        setFontSize((prev) => Math.min(Math.max(prev + delta, 12), 24));
    const handleTabChange = (tab: string) => {
        setLoading(true);
        setTimeout(() => {
            setActiveTab(tab);
            setLoading(false);
        }, 500);
    };

    const showBibleVersions = (reference: string) => {
        setSelectedVerse(reference);
        setShowVerseModal(true);
        setVerseLoading(true);
        setTimeout(() => setVerseLoading(false), 800);
    };

    const changeBibleVersion = (version: keyof BibleVersions) => {
        setVerseLoading(true);
        setTimeout(() => {
            setBibleVersion(version);
            setVerseLoading(false);
        }, 600);
    };

    const addNewScripture = () => {
        if (
            newVerse.reference &&
            Object.values(newVerse.versions).some((v) => v !== "")
        ) {
            setScriptureDB((prev) => ({
                ...prev,
                [newVerse.reference]: newVerse.versions,
            }));
            setNewVerse({
                reference: "",
                versions: {
                    KJV: "",
                    NKJV: "",
                    NIV: "",
                    ESV: "",
                    AMP: "",
                    NLT: "",
                },
            });
            setEditMode(false);
        }
    };

    const updateVerseVersion = (version: keyof BibleVersions, text: string) => {
        setNewVerse((prev) => ({
            ...prev,
            versions: { ...prev.versions, [version]: text },
        }));
    };

    

   

   

   

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.shiftKey && e.key === "M") {
                e.preventDefault();
                handleTabChange("manage");
            }
            if (e.ctrlKey && e.shiftKey && e.key === "E") {
                e.preventDefault();
                setEditingContent(editingContent ? null : activeTab);
            }
        };
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [editingContent, activeTab]);

    const updateContent = (field: string, value: string) =>
        setContentData((prev) => ({ ...prev, [field]: value }));
    const updateLessonPoint = (index: number, field: string, value: string) => {
        setContentData((prev) => ({
            ...prev,
            lessonPoints: prev.lessonPoints.map((point, i) =>
                i === index ? { ...point, [field]: value } : point
            ),
        }));
    };
    const updatePrayerPoint = (index: number, value: string) => {
        setContentData((prev) => ({
            ...prev,
            prayerPoints: prev.prayerPoints.map((prayer, i) =>
                i === index ? value : prayer
            ),
        }));
    };
    const updateLessonSubPoint = (
        pointIndex: number,
        subIndex: number,
        field: string,
        value: string
    ) => {
        setContentData((prev) => ({
            ...prev,
            lessonPoints: prev.lessonPoints.map((point, i) =>
                i === pointIndex
                    ? {
                          ...point,
                          subPoints: point.subPoints.map((sub, j) =>
                              j === subIndex ? { ...sub, [field]: value } : sub
                          ),
                      }
                    : point
            ),
        }));
    };
    const addLessonSubPoint = (pointIndex: number) => {
        setContentData((prev) => ({
            ...prev,
            lessonPoints: prev.lessonPoints.map((point, i) =>
                i === pointIndex
                    ? {
                          ...point,
                          subPoints: [
                              ...point.subPoints,
                              {
                                  title: "New Point",
                                  content: "",
                                  scripture: "",
                              },
                          ],
                      }
                    : point
            ),
        }));
    };
    const deleteLessonSubPoint = (pointIndex: number, subIndex: number) => {
        setContentData((prev) => ({
            ...prev,
            lessonPoints: prev.lessonPoints.map((point, i) =>
                i === pointIndex
                    ? {
                          ...point,
                          subPoints: point.subPoints.filter(
                              (_, j) => j !== subIndex
                          ),
                      }
                    : point
            ),
        }));
    };
    const addPrayerPoint = () =>
        setContentData((prev) => ({
            ...prev,
            prayerPoints: [...prev.prayerPoints, "New prayer point..."],
        }));

    const PAYSTACK_PUBLIC_KEY =
        "pk_test_bed97038ebcf74b30219ed0500cfffc6e80948f1";
    const PAYMENT_AMOUNT = 500000;

    const handlePaystackSuccess = (reference: unknown) => {
        console.log("Payment successful:", reference);
        setIsPaid(true);
        setShowPaymentGate(false);
    };

    const handlePaystackClose = () => console.log("Payment closed");

    const initializePaystack = () => {
        if (!window.PaystackPop) {
            alert("Paystack script not loaded!");
            return;
        }
        const paystack = window.PaystackPop.setup({
            key: PAYSTACK_PUBLIC_KEY,
            email: "user@example.com",
            amount: PAYMENT_AMOUNT,
            currency: "NGN",
            reference: "SSA_" + Math.floor(Math.random() * 1000000000 + 1),
            onClose: () => handlePaystackClose(),
            callback: (transaction: PaystackResponse) =>
                handlePaystackSuccess(transaction),
        });
        paystack.openIframe();
    };

    const handleFreePlan = () => {
        setShowPaymentGate(false);
        setIsPaid(false);
    };

    const themeClasses = darkMode
        ? "bg-gradient-to-br from-gray-900 via-blue-900 to-green-900 text-white"
        : "bg-gradient-to-br from-amber-50 via-orange-50 to-rose-100 text-gray-900";


        if (appLoading) {
    const animatedText = "Receive the LIGHT and Manifest the good works of God! - Matthew 5:14-16!".split("");

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center z-50">
            <div className="text-center">
                <div className="relative mb-8">
                    <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center shadow-2xl animate-[wave-float_3s_ease-in-out_infinite]">
                        <img
                            src={logo}
                            alt="Logo"
                            className="w-20 h-20 object-contain"
                        />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full border-4 border-white/30 animate-ping"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div
                            className="w-40 h-40 rounded-full border-4 border-white/20 animate-ping"
                            style={{ animationDelay: "0.3s" }}
                        ></div>
                    </div>
                </div>

                




                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 text-wrap break-words text-center px-4">
                    Life Gate Ministries Worldwide
                </h1>
                <p className="text-lg sm:text-xl text-white/90 mb-8 text-center px-4">
                    Sunday School Lessons
                </p>

                {/* Single-color glowing neon text */}
                <div className="flex flex-wrap justify-center mb-6 text-2xl sm:text-3xl md:text-4xl font-extrabold px-4 max-w-full">
                    {animatedText.map((char, idx) => (
                        <span
                            key={idx}
                            className="inline-block text-blue-400 drop-shadow-[0_0_10px_#00ffff] animate-[wave_1.5s_ease-in-out_infinite]"
                            style={{
                                animationDelay: `${idx * 0.1}s`,
                            }}
                        >
                            {char === " " ? "\u00A0" : char}
                        </span>
                    ))}
                </div>







                <div className="text-white/80 mb-6 text-lg animate-pulse">
                    Loading Sunday School Lesson...
                </div>
                <div className="w-64 mx-auto bg-white/20 rounded-full h-3 overflow-hidden backdrop-blur-sm">
                    <div
                        className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-300 ease-out shadow-lg"
                        style={{ width: `${loadingProgress}%` }}
                    ></div>
                </div>
                <p className="text-white/70 mt-3 text-sm">
                    {loadingProgress}%
                </p>
            </div>

            {/* Keyframes for smooth wave bounce */}
            <style>
                {`
                    @keyframes wave {
                        0%, 100% { transform: translateY(0); }
                        25% { transform: translateY(-12px); }
                        50% { transform: translateY(8px); }
                        75% { transform: translateY(-6px); }
                    }
                `}
            </style>
        </div>
    );
}




    if (showPaymentGate) {
        return (
            <div
                className={`min-h-screen ${themeClasses} flex items-center justify-center p-4 relative overflow-hidden`}
            >
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute w-96 h-96 bg-purple-500/30 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
                    <div
                        className="absolute w-96 h-96 bg-blue-500/30 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse"
                        style={{ animationDelay: "1s" }}
                    ></div>
                    <div
                        className="absolute w-64 h-64 bg-pink-500/20 rounded-full blur-3xl top-1/2 left-1/2 animate-pulse"
                        style={{ animationDelay: "2s" }}
                    ></div>
                </div>
                <div className="max-w-4xl w-full relative z-10">
                    <div className="text-center mb-12">
                        <div className="w-24 h-24 mx-auto mb-6 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center shadow-2xl border border-white/20">
                            <img
                                src={logo}
                                alt="Logo"
                                className="w-16 h-16 object-contain"
                            />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Sunday School Lesson
                        </h1>
                        <p className="text-xl opacity-80">
                            INFLUENCE OF THE MIX MULTITUDES PART 2
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
                            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition duration-300 shadow-2xl">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-bold">
                                        Free Access
                                    </h3>
                                    <Unlock
                                        className="text-green-400"
                                        size={32}
                                    />
                                </div>
                                <div className="mb-6">
                                    <p className="text-4xl font-bold mb-2">
                                        ₦0
                                    </p>
                                    <p className="opacity-70">View Only Mode</p>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle
                                            size={20}
                                            className="text-green-400"
                                        />
                                        <span>Read all lesson content</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle
                                            size={20}
                                            className="text-green-400"
                                        />
                                        <span>Take interactive quizzes</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <X size={20} className="text-red-400" />
                                        <span className="opacity-50">
                                            No content editing
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <X size={20} className="text-red-400" />
                                        <span className="opacity-50">
                                            No scripture management
                                        </span>
                                    </li>
                                </ul>
                                <button
                                    onClick={handleFreePlan}
                                    className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl font-semibold text-white shadow-lg transform hover:scale-105 transition duration-300"
                                >
                                    Continue Free
                                </button>
                            </div>
                        </div>
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
                            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition duration-300 shadow-2xl">
                                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                                    BEST VALUE
                                </div>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-bold">
                                        Premium Access
                                    </h3>
                                    <Lock
                                        className="text-purple-400"
                                        size={32}
                                    />
                                </div>
                                <div className="mb-6">
                                    <p className="text-4xl font-bold mb-2">
                                        ₦5,000
                                    </p>
                                    <p className="opacity-70">Full Access</p>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle
                                            size={20}
                                            className="text-purple-400"
                                        />
                                        <span>Everything in Free</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle
                                            size={20}
                                            className="text-purple-400"
                                        />
                                        <span>Edit all lesson content</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle
                                            size={20}
                                            className="text-purple-400"
                                        />
                                        <span>Manage Bible scriptures</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle
                                            size={20}
                                            className="text-purple-400"
                                        />
                                        <span>Save your commitments</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle
                                            size={20}
                                            className="text-purple-400"
                                        />
                                        <span>Priority support</span>
                                    </li>
                                </ul>
                                <button
                                    onClick={initializePaystack}
                                    className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-xl font-semibold text-white shadow-lg transform hover:scale-105 transition duration-300"
                                >
                                    Unlock Premium
                                </button>
                            </div>
                        </div>
                    </div>
                    <p className="text-center mt-8 opacity-70 text-sm">
                        Secure payment powered by Paystack • All transactions
                        are encrypted
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`min-h-screen ${themeClasses} transition-all duration-500 relative`}
            style={{ fontSize: `${fontSize}px` }}
        >
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl top-0 left-1/4 animate-pulse"></div>
                <div
                    className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl bottom-0 right-1/4 animate-pulse"
                    style={{ animationDelay: "1s" }}
                ></div>
            </div>
            <Header
                logo={logo}
                contentData={contentData}
                fontSize={fontSize}
                adjustFontSize={adjustFontSize}
                darkMode={darkMode}
                toggleTheme={toggleTheme}
            />
            <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {contentData.lessonTitle}
                </h2>
                <div className="flex gap-2 mb-6 overflow-x-auto flex-nowrap md:flex-wrap justify-start md:justify-center scrollbar-hide backdrop-blur-sm bg-white/5 p-2 rounded-2xl border border-white/10">
                    {[
                        "intro",
                        "lesson",
                        "conclusion",
                        "prayer",
                    ].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTabChange(tab)}
                            className={`px-6 py-3 rounded-xl font-semibold transition-all flex-shrink-0 ${
                                activeTab === tab
                                    ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg scale-105"
                                    : darkMode
                                    ? "bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/10"
                                    : "bg-black/10 backdrop-blur-md hover:bg-black/20 border border-black/10"
                            }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                    {isPaid && (
                        <button
                            onClick={() => handleTabChange("manage")}
                            className={`px-2 py-3 rounded-xl font-semibold transition-all flex-shrink-0 opacity-0 hover:opacity-10 ${
                                activeTab === "manage"
                                    ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg scale-105"
                                    : "bg-white/10 backdrop-blur-md"
                            }`}
                            title="Admin"
                            style={{ width: "40px" }}
                        >
                            <Edit2 size={16} className="mx-auto" />
                        </button>
                    )}
                </div>
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
                    </div>
                )}
                {!loading && (
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 md:p-8">
                        













                    {activeTab === "intro" && (
                        <div className="space-y-6">
                            {editingContent === "intro" && (
                                <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 rounded-lg p-3 mb-4 flex items-center justify-between">
                                    <span className="flex items-center gap-2">
                                        <Edit2
                                            size={16}
                                            className="text-yellow-700"
                                        />
                                        <span className="text-yellow-700 dark:text-yellow-400 font-semibold">
                                            Edit Mode Active
                                        </span>
                                    </span>
                                    <button
                                        onClick={() =>
                                            setEditingContent(null)
                                        }
                                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
                                    >
                                        Done Editing
                                    </button>
                                </div>
                            )}
                            <div
                                className={`${
                                    darkMode
                                        ? "bg-blue-900/30"
                                        : "bg-blue-50"
                                } p-6 rounded-lg border-l-4 border-blue-600`}
                            >
                                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                    <BookOpen className="text-blue-600" />{" "}
                                    Memory Verse
                                </h3>
                                {editingContent === "intro" ? (
                                    <textarea
                                        value={contentData.memoryVerse}
                                        onChange={(e) =>
                                            updateContent(
                                                "memoryVerse",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full px-4 py-2 rounded-lg border text-xl italic mb-4 ${
                                            darkMode
                                                ? "bg-gray-800 border-gray-600"
                                                : "bg-white border-gray-300"
                                        }`}
                                        rows={2}
                                    />
                                ) : (
                                    <blockquote className="text-xl italic mb-4">
                                        "{contentData.memoryVerse}"
                                    </blockquote>
                                )}
                                <button
                                    onClick={() =>
                                        showBibleVersions(
                                            contentData.memoryVerseRef
                                        )
                                    }
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
                                >
                                    <BookOpen size={16} />
                                    Read {contentData.memoryVerseRef}
                                </button>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-3">
                                    Text: Numbers 11:4-6, 10-15, 33
                                </h3>
                                <div className="flex gap-2 flex-wrap">
                                    <button
                                        onClick={() =>
                                            showBibleVersions(
                                                "Numbers 11:4-6"
                                            )
                                        }
                                         className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition flex items-center gap-2 text-sm shadow-md"
                                        >
                                        <BookOpen size={16} />
                                        Numbers 11:4-6
                                    </button>
                                    <button
                                        onClick={() =>
                                            showBibleVersions(
                                                "Numbers 11:10-15"
                                            )
                                        }
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition flex items-center gap-2 text-sm shadow-md"
                                        >
                                        <BookOpen size={16} />
                                        Numbers 11:10-15
                                    </button>
                                    <button
                                        onClick={() =>
                                            showBibleVersions(
                                                "Numbers 11:33"
                                            )
                                        }
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition flex items-center gap-2 text-sm shadow-md"                                    >
                                        <BookOpen size={16} />
                                        Numbers 11:33
                                    </button>

                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-3">
                                    Introduction
                                </h3>
                                {editingContent === "intro" ? (
                                    <textarea
                                        value={contentData.introduction}
                                        onChange={(e) =>
                                            updateContent(
                                                "introduction",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full px-4 py-2 rounded-lg border ${
                                            darkMode
                                                ? "bg-gray-800 border-gray-600"
                                                : "bg-white border-gray-300"
                                        }`}
                                        rows={6}
                                    />
                                ) : (
                                    <div>
                                        <p className="leading-relaxed">
                                            {contentData.introduction}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-4">
                                           
                                            <button
                                                onClick={() =>
                                                    showBibleVersions(
                                                        "1 Corinthians 10:12"
                                                    )
                                                }
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition flex items-center gap-2 text-sm shadow-md"
                                            >
                                                <BookOpen size={16} />
                                                1 Corinthians 10:12
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div
                                className={`${
                                    darkMode
                                        ? "bg-green-900/30"
                                        : "bg-green-50"
                                } p-6 rounded-lg`}
                            >
                                <h3 className="text-xl font-bold mb-3">
                                    Aims and Objectives
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <strong className="text-green-700 dark:text-green-400 block mb-1">
                                            AIMS:
                                        </strong>
                                        {editingContent === "intro" ? (
                                            <textarea
                                                value={contentData.aims}
                                                onChange={(e) =>
                                                    updateContent(
                                                        "aims",
                                                        e.target.value
                                                    )
                                                }
                                                className={`w-full px-3 py-2 rounded-lg border mt-2 ${
                                                    darkMode
                                                        ? "bg-gray-800 border-gray-600"
                                                        : "bg-white border-gray-300"
                                                }`}
                                                rows={3}
                                            />
                                        ) : (
                                            <p className="leading-relaxed opacity-90">{contentData.aims}</p>
                                        )}
                                    </div>
                                    <div>
                                        <strong className="text-green-700 dark:text-green-400 block mb-1">
                                            OBJECTIVES:
                                        </strong>
                                        {editingContent === "intro" ? (
                                            <textarea
                                                value={contentData.objectives}
                                                onChange={(e) =>
                                                    updateContent(
                                                        "objectives",
                                                        e.target.value
                                                    )
                                                }
                                                className={`w-full px-3 py-2 rounded-lg border mt-2 ${
                                                    darkMode
                                                        ? "bg-gray-800 border-gray-600"
                                                        : "bg-white border-gray-300"
                                                }`}
                                                rows={2}
                                            />
                                        ) : (
                                            <div>
                                                <p className="leading-relaxed opacity-90 mb-3">
                                                    {contentData.objectives}
                                                </p>
                                                {contentData.objectiveScriptures && contentData.objectiveScriptures.length > 0 && (
                                                    <div className="flex flex-wrap gap-2">
                                                        {contentData.objectiveScriptures.map((scripture) => (
                                                            <button
                                                                key={scripture}
                                                                onClick={() => showBibleVersions(scripture)}
                                                                className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-3 py-1.5 rounded-lg transition flex items-center gap-2 text-xs font-medium shadow-md"
                                                            >
                                                                <BookOpen size={14} />
                                                                Read {scripture}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}


























                        {activeTab === "lesson" && (
                            <div className="space-y-6">
                                {editingContent === "lesson" && (
                                    <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 rounded-lg p-3 mb-4 flex items-center justify-between">
                                        <span className="flex items-center gap-2">
                                            <Edit2
                                                size={16}
                                                className="text-yellow-700"
                                            />
                                            <span className="text-yellow-700 dark:text-yellow-400 font-semibold">
                                                Edit Mode Active
                                            </span>
                                        </span>
                                        <button
                                            onClick={() =>
                                                setEditingContent(null)
                                            }
                                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Done Editing
                                        </button>
                                    </div>
                                )}
                                <h3 className="text-2xl font-bold mb-4">
                                    Lesson Content
                                </h3>
                                {editingContent === "lesson" ? (
                                    <textarea
                                        value={contentData.lessonIntro}
                                        onChange={(e) =>
                                            updateContent(
                                                "lessonIntro",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full px-4 py-2 rounded-lg border mb-4 ${
                                            darkMode
                                                ? "bg-gray-800 border-gray-600"
                                                : "bg-white border-gray-300"
                                        }`}
                                        rows={3}
                                    />
                                ) : (
                                    <p className="leading-relaxed mb-4">
                                        {contentData.lessonIntro}
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {/* {contentData.lessonIntroScriptures.map(
                                                (scripture) => (
                                                    <button
                                                        key={scripture}
                                                        onClick={() =>
                                                            showBibleVersions(
                                                                scripture
                                                            )
                                                        }
                                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2 text-sm"
                                                    >
                                                        <BookOpen size={14} />
                                                        {scripture}
                                                    </button>
                                                )
                                            )} */}
                                            {/* 2. The Scripture Buttons container safely placed outside the <p> tag */}
                                            {contentData.lessonIntroScriptures && contentData.lessonIntroScriptures.length > 0 && (
                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {contentData.lessonIntroScriptures.map((scripture) => (
                                                        <button
                                                            key={scripture}
                                                            onClick={() => showBibleVersions(scripture)}
                                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2 text-sm font-medium shadow-sm"
                                                        >
                                                            <BookOpen size={16} />
                                                            Read {scripture}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                    
                                        </div>
                                        
                                    </p>
                                    
                                )}
                                <div className="space-y-6">
                                    {contentData.lessonPoints.map(
                                        (section, idx) => (
                                            <div
                                                key={idx}
                                                className={`${
                                                    darkMode
                                                        ? "bg-gray-700"
                                                        : "bg-gray-50"
                                                } p-5 rounded-lg`}
                                            >
                                                {editingContent === "lesson" ? (
                                                    <>
                                                        <input
                                                            type="text"
                                                            value={
                                                                section.title
                                                            }
                                                            onChange={(e) =>
                                                                updateLessonPoint(
                                                                    idx,
                                                                    "title",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className={`w-full px-3 py-2 rounded-lg border mb-3 text-xl font-semibold ${
                                                                darkMode
                                                                    ? "bg-gray-800 border-gray-600"
                                                                    : "bg-white border-gray-300"
                                                            }`}
                                                        />
                                                        {section.content && (
                                                            <textarea
                                                                value={
                                                                    section.content
                                                                }
                                                                onChange={(e) =>
                                                                    updateLessonPoint(
                                                                        idx,
                                                                        "content",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className={`w-full px-3 py-2 rounded-lg border mb-3 ${
                                                                    darkMode
                                                                        ? "bg-gray-800 border-gray-600"
                                                                        : "bg-white border-gray-300"
                                                                }`}
                                                                rows={3}
                                                            />
                                                        )}
                                                        <div className="ml-6 space-y-3 mt-3">
                                                            {section.subPoints.map(
                                                                (
                                                                    subPoint,
                                                                    subIdx
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            subIdx
                                                                        }
                                                                        className={`${
                                                                            darkMode
                                                                                ? "bg-gray-800"
                                                                                : "bg-white"
                                                                        } p-3 rounded-lg`}
                                                                    >
                                                                        <div className="flex justify-between items-start mb-2">
                                                                            <span className="text-sm font-bold text-yellow-600">
                                                                                {String.fromCharCode(
                                                                                    97 +
                                                                                        subIdx
                                                                                )}

                                                                                .
                                                                            </span>
                                                                            <button
                                                                                onClick={() =>
                                                                                    deleteLessonSubPoint(
                                                                                        idx,
                                                                                        subIdx
                                                                                    )
                                                                                }
                                                                                className="text-red-600 hover:text-red-800"
                                                                            >
                                                                                <X
                                                                                    size={
                                                                                        16
                                                                                    }
                                                                                />
                                                                            </button>
                                                                        </div>
                                                                        <input
                                                                            type="text"
                                                                            value={
                                                                                subPoint.title
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                updateLessonSubPoint(
                                                                                    idx,
                                                                                    subIdx,
                                                                                    "title",
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                            placeholder="Sub-point title"
                                                                            className={`w-full px-3 py-1 rounded border mb-2 text-sm font-semibold ${
                                                                                darkMode
                                                                                    ? "bg-gray-700 border-gray-600"
                                                                                    : "bg-gray-50 border-gray-300"
                                                                            }`}
                                                                        />
                                                                        <textarea
                                                                            value={
                                                                                subPoint.content
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                updateLessonSubPoint(
                                                                                    idx,
                                                                                    subIdx,
                                                                                    "content",
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                            placeholder="Sub-point content"
                                                                            className={`w-full px-3 py-1 rounded border mb-2 text-sm ${
                                                                                darkMode
                                                                                    ? "bg-gray-700 border-gray-600"
                                                                                    : "bg-gray-50 border-gray-300"
                                                                            }`}
                                                                            rows={
                                                                                2
                                                                            }
                                                                        />
                                                                        <input
                                                                            type="text"
                                                                            value={
                                                                                subPoint.scripture ||
                                                                                ""
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                updateLessonSubPoint(
                                                                                    idx,
                                                                                    subIdx,
                                                                                    "scripture",
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                            placeholder="Scripture reference (optional)"
                                                                            className={`w-full px-3 py-1 rounded border text-sm ${
                                                                                darkMode
                                                                                    ? "bg-gray-700 border-gray-600"
                                                                                    : "bg-gray-50 border-gray-300"
                                                                            }`}
                                                                        />
                                                                    </div>
                                                                )
                                                            )}
                                                            <button
                                                                onClick={() =>
                                                                    addLessonSubPoint(
                                                                        idx
                                                                    )
                                                                }
                                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
                                                            >
                                                                <Plus
                                                                    size={14}
                                                                />{" "}
                                                                Add Sub-point
                                                            </button>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <h4 className="text-xl font-semibold mb-2">
                                                            {idx + 1}.{" "}
                                                            {section.title}
                                                        </h4>
                                                        {section.content && (
                                                            <p className="leading-relaxed mb-3">
                                                                {
                                                                    section.content
                                                                }
                                                            </p>
                                                        )}
                                                        {section.scriptures &&
                                                            section.scriptures
                                                                .length > 0 && (
                                                                <div className="mt-3 flex flex-wrap gap-2">
                                                                    {section.scriptures.map(
                                                                        (
                                                                            scripture
                                                                        ) => (
                                                                            <button
                                                                                key={
                                                                                    scripture
                                                                                }
                                                                                onClick={() =>
                                                                                    showBibleVersions(
                                                                                        scripture
                                                                                    )
                                                                                }
                                                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition flex items-center gap-2 text-sm"
                                                                            >
                                                                                <BookOpen
                                                                                    size={
                                                                                        14
                                                                                    }
                                                                                />
                                                                                {
                                                                                    scripture
                                                                                }
                                                                            </button>
                                                                        )
                                                                    )}
                                                                </div>
                                                            )}
                                                        {section.subPoints &&
                                                            section.subPoints
                                                                .length > 0 && (
                                                                <ol className="list-[lower-alpha] ml-6 space-y-3 mt-3">
                                                                    {section.subPoints.map(
                                                                        (
                                                                            subPoint,
                                                                            subIdx
                                                                        ) => (
                                                                            <li
                                                                                key={
                                                                                    subIdx
                                                                                }
                                                                            >
                                                                                <strong>
                                                                                    {
                                                                                        subPoint.title
                                                                                    }

                                                                                    :
                                                                                </strong>{" "}
                                                                                {
                                                                                    subPoint.content
                                                                                }
                                                                                {subPoint.scripture && (
                                                                                    <button
                                                                                        onClick={() => {
                                                                                            if (
                                                                                                subPoint.scripture
                                                                                            )
                                                                                                showBibleVersions(
                                                                                                    subPoint.scripture
                                                                                                );
                                                                                        }}
                                                                                        className="ml-2 text-blue-600 hover:text-blue-800 text-sm"
                                                                                    >
                                                                                        📖
                                                                                        Read{" "}
                                                                                        {
                                                                                            subPoint.scripture
                                                                                        }
                                                                                    </button>
                                                                                )}
                                                                            </li>
                                                                        )
                                                                    )}
                                                                </ol>
                                                            )}
                                                    </>
                                                )}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                        {activeTab === "conclusion" && (
                            <div className="space-y-4">
                                {editingContent === "conclusion" && (
                                    <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 rounded-lg p-3 mb-4 flex items-center justify-between">
                                        <span className="flex items-center gap-2">
                                            <Edit2
                                                size={16}
                                                className="text-yellow-700"
                                            />
                                            <span className="text-yellow-700 dark:text-yellow-400 font-semibold">
                                                Edit Mode Active
                                            </span>
                                        </span>
                                        <button
                                            onClick={() =>
                                                setEditingContent(null)
                                            }
                                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Done Editing
                                        </button>
                                    </div>
                                )}
                                <h3 className="text-2xl font-bold mb-4">
                                    Conclusion
                                </h3>
                                {editingContent === "conclusion" ? (
                                    <textarea
                                        value={contentData.conclusion}
                                        onChange={(e) =>
                                            updateContent(
                                                "conclusion",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full px-4 py-2 rounded-lg border text-lg ${
                                            darkMode
                                                ? "bg-gray-800 border-gray-600"
                                                : "bg-white border-gray-300"
                                        }`}
                                        rows={4}
                                    />
                                ) : (
                                    <p className="text-lg leading-relaxed">
                                        {contentData.conclusion}
                                    </p>
                                )}
                                {contentData.conclusionScriptures &&
                                    contentData.conclusionScriptures.length >
                                        0 && (
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {contentData.conclusionScriptures.map(
                                                (scripture) => (
                                                    <button
                                                        key={scripture}
                                                        onClick={() =>
                                                            showBibleVersions(
                                                                scripture
                                                            )
                                                        }
                                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2 text-sm"
                                                    >
                                                        <BookOpen size={14} />
                                                        {scripture}
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    )}
                            </div>
                        )}
            

                       











                       
                        {activeTab === "prayer" && (
                            <div className="space-y-4">
                                {editingContent === "prayer" && (
                                    <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 rounded-lg p-3 mb-4 flex items-center justify-between">
                                        <span className="flex items-center gap-2">
                                            <Edit2
                                                size={16}
                                                className="text-yellow-700"
                                            />
                                            <span className="text-yellow-700 dark:text-yellow-400 font-semibold">
                                                Edit Mode Active
                                            </span>
                                        </span>
                                        <button
                                            onClick={() =>
                                                setEditingContent(null)
                                            }
                                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Done Editing
                                        </button>
                                    </div>
                                )}
                                <h3 className="text-2xl font-bold mb-6">
                                    Prayer Points
                                </h3>
                                {contentData.prayerPoints.map((prayer, idx) => (
                                    <div
                                        key={idx}
                                        className={`${
                                            darkMode
                                                ? "bg-gray-700"
                                                : "bg-gradient-to-r from-purple-50 to-pink-50"
                                        } p-6 rounded-lg border-l-4 border-purple-600`}
                                    >
                                        {editingContent === "prayer" ? (
                                            <textarea
                                                value={prayer}
                                                onChange={(e) =>
                                                    updatePrayerPoint(
                                                        idx,
                                                        e.target.value
                                                    )
                                                }
                                                className={`w-full px-3 py-2 rounded-lg border ${
                                                    darkMode
                                                        ? "bg-gray-800 border-gray-600"
                                                        : "bg-white border-gray-300"
                                                }`}
                                                rows={3}
                                            />
                                        ) : (
                                            <p className="text-lg leading-relaxed">
                                                {prayer}
                                            </p>
                                        )}
                                    </div>
                                ))}
                                {editingContent === "prayer" && (
                                    <button
                                        onClick={addPrayerPoint}
                                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
                                    >
                                        <Plus size={16} /> Add Prayer Point
                                    </button>
                                )}
                            </div>
                        )}
                        {activeTab === "manage" && isPaid && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-2xl font-bold">
                                        Manage Scriptures
                                    </h3>
                                    <button
                                        onClick={() => setEditMode(!editMode)}
                                        className={`${
                                            editMode
                                                ? "bg-red-600 hover:bg-red-700"
                                                : "bg-green-600 hover:bg-green-700"
                                        } text-white px-4 py-2 rounded-lg transition flex items-center gap-2`}
                                    >
                                        {editMode ? (
                                            <>
                                                <X size={16} /> Cancel
                                            </>
                                        ) : (
                                            <>
                                                <Edit2 size={16} /> Add New
                                            </>
                                        )}
                                    </button>
                                </div>
                                {editMode && (
                                    <div
                                        className={`${
                                            darkMode
                                                ? "bg-gray-700"
                                                : "bg-blue-50"
                                        } p-6 rounded-lg space-y-4`}
                                    >
                                        <input
                                            type="text"
                                            value={newVerse.reference}
                                            onChange={(e) =>
                                                setNewVerse({
                                                    ...newVerse,
                                                    reference: e.target.value,
                                                })
                                            }
                                            placeholder="Scripture Reference (e.g., John 3:16)"
                                            className={`w-full px-4 py-2 rounded-lg border ${
                                                darkMode
                                                    ? "bg-gray-800 border-gray-600"
                                                    : "bg-white border-gray-300"
                                            }`}
                                        />
                                        {(
                                            [
                                                "KJV",
                                                "NKJV",
                                                "NIV",
                                                "ESV",
                                                "AMP",
                                                "NLT",
                                            ] as const
                                        ).map((version) => (
                                            <div key={version}>
                                                <label className="block font-semibold mb-2">
                                                    {version}
                                                </label>
                                                <textarea
                                                    value={
                                                        newVerse.versions[
                                                            version
                                                        ] || ""
                                                    }
                                                    onChange={(e) =>
                                                        updateVerseVersion(
                                                            version,
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder={`Enter ${version} text...`}
                                                    rows={3}
                                                    className={`w-full px-4 py-2 rounded-lg border ${
                                                        darkMode
                                                            ? "bg-gray-800 border-gray-600"
                                                            : "bg-white border-gray-300"
                                                    }`}
                                                />
                                            </div>
                                        ))}
                                        <button
                                            onClick={addNewScripture}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition flex items-center gap-2"
                                        >
                                            <Save size={16} /> Save Scripture
                                        </button>
                                    </div>
                                )}
                                <div className="space-y-3">
                                    {Object.keys(scriptureDB).map(
                                        (reference) => (
                                            <div
                                                key={reference}
                                                className={`${
                                                    darkMode
                                                        ? "bg-gray-700"
                                                        : "bg-white border border-gray-200"
                                                } p-4 rounded-lg`}
                                            >
                                                <h4 className="font-bold text-lg mb-2">
                                                    {reference}
                                                </h4>
                                                <button
                                                    onClick={() =>
                                                        showBibleVersions(
                                                            reference
                                                        )
                                                    }
                                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                                >
                                                    View All Versions →
                                                </button>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                        {activeTab === "manage" && !isPaid && (
                            <div className="text-center py-12">
                                <Lock
                                    size={64}
                                    className="mx-auto mb-4 text-purple-400"
                                />
                                <h3 className="text-2xl font-bold mb-4">
                                    Premium Feature
                                </h3>
                                <p className="mb-6">
                                    Upgrade to Premium to access scripture
                                    management
                                </p>
                                <button
                                    onClick={() => setShowPaymentGate(true)}
                                    className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-3 rounded-xl font-semibold"
                                >
                                    Unlock Now
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
            {showVerseModal && selectedVerse && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                    onClick={() => setShowVerseModal(false)}
                >
                    <div
                        className={`${
                            darkMode ? "bg-gray-800" : "bg-white"
                        } rounded-xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl font-bold">
                                    {selectedVerse}
                                </h3>
                                <button
                                    onClick={() => setShowVerseModal(false)}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                        </div>
                        <div className="flex gap-2 p-4 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
                            {(
                                [
                                    "KJV",
                                    "NKJV",
                                    "NIV",
                                    "ESV",
                                    "AMP",
                                    "NLT",
                                ] as const
                            ).map((version) => (
                                <button
                                    key={version}
                                    onClick={() => changeBibleVersion(version)}
                                    disabled={verseLoading}
                                    className={`px-4 py-2 rounded-lg font-semibold transition whitespace-nowrap ${
                                        bibleVersion === version
                                            ? "bg-blue-600 text-white"
                                            : darkMode
                                            ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                    } ${
                                        verseLoading
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                    }`}
                                >
                                    {version}
                                </button>
                            ))}
                        </div>
                        <div
                            className="p-6 overflow-y-auto"
                            style={{ maxHeight: "calc(85vh - 180px)" }}
                        >
                            {verseLoading ? (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <div className="relative w-16 h-16 mb-4">
                                        <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
                                        <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                                    </div>
                                    <p className="text-gray-500 animate-pulse">
                                        Loading scripture...
                                    </p>
                                </div>
                            ) : selectedVerse &&
                              scriptureDB[selectedVerse] &&
                              scriptureDB[selectedVerse][bibleVersion] ? (
                                <div className="text-lg leading-relaxed animate-fadeIn">
                                    {formatScriptureText(
                                        scriptureDB[selectedVerse][bibleVersion]
                                    )}
                                </div>
                            ) : (
                                <p className="text-gray-500 italic">
                                    Translation not available
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SundaySchoolApp;
