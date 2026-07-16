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
  "Matthew 6:33": {
    "KJV": "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.",
    "NKJV": "But seek first the kingdom of God and His righteousness, and all these things shall be added to you.",
    "NIV": "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
    "ESV": "But seek first the kingdom of God and his righteousness, and all these things will be added to you.",
    "AMP": "But first and most importantly seek (aim at, strive after) His kingdom and His righteousness [His way of doing and being right—the attitude and character of God], and all these things will be given to you also.",
    "NLT": "Seek the Kingdom of God above all else, and live righteously, and he will give you everything you need."
  },
  "Matthew 12:38-42": {
    "KJV": "38 Then certain of the scribes and of the Pharisees answered, saying, Master, we would see a sign from thee. 39 But he answered and said unto them, An evil and adulterous generation seeketh after a sign; and there shall no sign be given to it, but the sign of the prophet Jonas: 40 For as Jonas was three days and three nights in the whale's belly; so shall the Son of man be three days and three nights in the heart of the earth. 41 The men of Nineveh shall rise in judgment with this generation, and shall condemn it: because they repented at the preaching of Jonas; and, behold, a greater than Jonas is here. 42 The queen of the south shall rise up in the judgment with this generation, and shall condemn it: for she came from the uttermost parts of the earth to hear the wisdom of Solomon; and, behold, a greater than Solomon is here.",
    "NKJV": "38 Then some of the scribes and Pharisees answered, saying, “Teacher, we want to see a sign from You.” 39 But He answered and said to them, “An evil and adulterous generation seeks after a sign, and no sign will be given to it except the sign of the prophet Jonah. 40 For as Jonah was three days and three nights in the belly of the great fish, so will the Son of Man be three days and three nights in the heart of the earth. 41 The men of Nineveh will rise up in the judgment with this generation and condemn it, because they repented at the preaching of Jonah; and indeed a greater than Jonah is here. 42 The queen of the South will rise up in the judgment with this generation and condemn it, for she came from the ends of the earth to hear the wisdom of Solomon; and indeed a greater than Solomon is here.",
    "NIV": "38 Then some of the Pharisees and teachers of the law said to him, “Teacher, we want to see a sign from you.” 39 He answered, “A wicked and adulterous generation asks for a sign! But none will be given it except the sign of the prophet Jonah. 40 For as Jonah was three days and three nights in the belly of a huge fish, so the Son of Man will be three days and three nights in the heart of the earth. 41 The men of Nineveh will stand up at the judgment with this generation and condemn it; for they repented at the preaching of Jonah, and now something greater than Jonah is here. 42 The Queen of the South will rise at the judgment with this generation and condemn it; for she came from the ends of the earth to listen to Solomon’s wisdom, and now something greater than Solomon is here.",
    "ESV": "38 Then some of the scribes and Pharisees answered him, saying, “Teacher, we wish to see a sign from you.” 39 But he answered them, “An evil and adulterous generation seeks for a sign, but no sign will be given to it except the sign of the prophet Jonah. 40 For as Jonah was three days and three nights in the belly of the great fish, so will the Son of Man be three days and three nights in the heart of the earth. 41 The men of Nineveh will rise up at the judgment with this generation and condemn it, for they repented at the preaching of Jonah, and behold, something greater than Jonah is here. 42 The queen of the South will rise up at the judgment with this generation and condemn it, for she came from the ends of the earth to hear the wisdom of Solomon, and behold, something greater than Solomon is here.",
    "AMP": "38 Then some of the scribes and Pharisees said to Him, “Teacher, we want to see a sign (attesting miracle) from You [proving that You are what You claim to be].” 39 But He replied, “An evil and adulterous generation [morally unfaithful to God] craves a sign; but no sign will be given to it except the sign of the prophet Jonah; 40 for just as Jonah was three days and three nights in the belly of the sea monster, so will the Son of Man be three days and three nights in the heart of the earth. 41 The men of Nineveh will stand up [as witnesses] at the judgment with this generation, and will condemn it because they repented at the preaching of Jonah; and look, Something greater than Jonah is here. 42 The Queen of the South (Sheba) will rise up [as a witness] at the judgment with this generation, and will condemn it because she came from the ends of the earth to hear the wisdom of Solomon; and look, Something greater than Solomon is here.",
    "NLT": "38 One day some teachers of religious law and Pharisees came to Jesus and said, “Teacher, we want you to show us a miraculous sign to prove your authority.” 39 But Jesus replied, “Only an evil, adulterous generation would demand a miraculous sign; but the only sign I will give them is the sign of the prophet Jonah. 40 For as Jonah was in the belly of the great fish for three days and three nights, so will the Son of Man be in the heart of the earth for three days and three nights. 41 The people of Nineveh will stand up against this generation on judgment day and condemn it, for they repented of their sins at the preaching of Jonah. And now someone greater than Jonah is here—but you refuse to repent. 42 The queen of Sheba will also stand up against this generation on judgment day and condemn it, for she came from such a distant land to hear the wisdom of Solomon. And now someone greater than Solomon is here—but you refuse to listen."
  },
  "1 Corinthians 6:20": {
    "KJV": "For ye are bought with a price: therefore glorify God in your body, and in your spirit, which are God's.",
    "NKJV": "For you were bought at a price; therefore glorify God in your body and in your spirit, which are God’s.",
    "NIV": "you were bought at a price. Therefore honor God with your bodies.",
    "ESV": "for you were bought with a price. So glorify God in your body.",
    "AMP": "You were bought with a price [purchased with a preciousness and paid for, made His own]. So then, honor God and bring glory to Him in your body.",
    "NLT": "for God bought you with a high price. So you must honor God with your body."
  },
  "Romans 6:18": {
    "KJV": "Being then made free from sin, ye became the servants of righteousness.",
    "NKJV": "And having been set free from sin, you became slaves of righteousness.",
    "NIV": "You have been set free from sin and have become slaves to righteousness.",
    "ESV": "and, having been set free from sin, have become slaves of righteousness.",
    "AMP": "And having been set free from sin, you have become the slaves of righteousness [of conformity to God’s will and ethical oneness with Him].",
    "NLT": "Now you are free from your slavery to sin, and you have become slaves to righteous living."
  },
  "Jonah 3:5-10": {
    "KJV": "5 So the people of Nineveh believed God, and proclaimed a fast, and put on sackcloth, from the greatest of them even to the least of them. 6 For word came unto the king of Nineveh, and he arose from his throne, and he laid his robe from him, and covered him with sackcloth, and sat in ashes. 7 And he caused it to be proclaimed and published through Nineveh by the decree of the king and his nobles, saying, Let neither man nor beast, herd nor flock, taste any thing: let them not feed, nor drink water: 8 But let man and beast be covered with sackcloth, and cry mightly unto God: yea, let them turn every one from his evil way, and from the violence that is in their hands. 9 Who can tell if God will turn and repent, and turn away from his fierce anger, that we perish not? 10 And God saw their works, that they turned from their evil way; and God repented of the evil, that he had said that he would do unto them; and he did it not.",
    "NKJV": "5 So the people of Nineveh believed God, proclaimed a fast, and put on sackcloth, from the greatest to the least of them. 6 Then word came to the king of Nineveh; and he arose from his throne and laid aside his robe, covered himself with sackcloth and sat in ashes. 7 And he caused it to be proclaimed and published throughout Nineveh by the decree of the king and his nobles, saying, Let neither man nor beast, herd nor flock, taste anything; do not let them feed, or drink water. 8 But let man and beast be covered with sackcloth, and cry mightily to God; yes, let everyone turn from his evil way and from the violence that is in his hands. 9 Who can tell if God will turn and relent, and turn away from His fierce anger, so that we may not perish? 10 Then God saw their works, that they turned from their evil way; and God relented from the disaster that He had said He would bring upon them, and He did not do it.",
    "NIV": "5 The Ninevites believed God. A fast was proclaimed, and all of them, from the greatest to the least, put on sackcloth. 6 When the news reached the king of Nineveh, he rose from his throne, took off his royal robes, covered himself with sackcloth and sat down in the dust. 7 This is the proclamation he issued in Nineveh: “By decree of the king and his nobles: Do not let people or animals, herds or flocks, taste anything; do not let them eat or drink. 8 But let people and animals be covered with sackcloth. Let everyone call urgently on God. Let them give up their evil ways and their violence. 9 Who knows? God may yet relent and with compassion turn from his fierce anger so that we will not perish.” 10 When God saw what they did and how they turned from their evil ways, he relented and did not bring on them the destruction he had threatened.",
    "ESV": "5 And the people of Nineveh believed God. They called for a fast and put on sackcloth, from the greatest of them to the least of them. 6 The word reached the king of Nineveh, and he arose from his throne, removed his robe, covered himself with sackcloth, and sat in ashes. 7 And he issued a proclamation and published through Nineveh, “By the decree of the king and his nobles: Let neither man nor beast, herd nor flock, taste anything. Let them not feed or drink water, 8 but let man and beast be covered with sackcloth, and let them call urgently to God. Let everyone turn from his evil way and from the violence that is in his hands. 9 Who knows? God may turn and relent and turn from his fierce anger, so that we may not perish.” 10 When God saw what they did, how they turned from their evil way, God relented of the disaster that he had said he would do to them, and he did not do it.",
    "AMP": "5 The people of Nineveh believed in God and they proclaimed a fast and put on sackcloth, from the greatest to the least of them. 6 When word reached the king of Nineveh [of Jonah’s message], he rose from his throne, took off his royal robe, covered himself with sackcloth and sat in the ashes. 7 He issued a proclamation and it said, “In Nineveh, by decree of the king and his nobles: No man or beast, herd or flock, shall taste anything. They shall not eat or drink water. 8 Both man and beast must be covered with sackcloth; and let every one cry out mightily to God and let everyone turn from his evil way and from the violence that is in his hands. 9 Who knows? God may turn and relent [and revoke His sentence against us] and turn from His fierce anger so that we will not perish.” 10 When God saw their deeds, that they turned from their evil way, then God relented concerning the disaster which He had declared He would bring upon them. And He did not do it.",
    "NLT": "5 The people of Nineveh believed God’s message, and from the greatest to the least, they declared a fast and put on burlap to show their sorrow. 6 When the king of Nineveh heard what Jonah was saying, he stepped down from his throne and took off his royal robes. He dressed himself in burlap and sat on a heap of ashes. 7 Then the king and his nobles sent this decree throughout the city: “No one, not even the animals from your herds and flocks, may eat or drink anything at all. 8 People and animals alike must wear burlap, and everyone must pray earnestly to God. They must turn from their evil ways and stop all their violence. 9 Who can tell? Perhaps even yet God will change his mind and hold back his fierce anger from destroying us.” 10 When God saw what they did and how they had turned from their evil ways, he had compassion and did not bring upon them the disaster he had threatened."
  },
  "John 3:16": {
    "KJV": "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
    "NKJV": "For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life.",
    "NIV": "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    "ESV": "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.",
    "AMP": "For God so [greatly] loved and dearly prized the world, that He [even] gave His [One and] only begotten Son, so that whoever believes and trusts in Him [as Savior] shall not perish, but have eternal life.",
    "NLT": "For this is how God loved the world: He gave his one and only Son, so that everyone who believes in him will not perish but have eternal life."
  },
  "Matthew 12:38": {
    "KJV": "Then certain of the scribes and of the Pharisees answered, saying, Master, we would see a sign from thee.",
    "NKJV": "Then some of the scribes and Pharisees answered, saying, “Teacher, we want to see a sign from You.”",
    "NIV": "Then some of the Pharisees and teachers of the law said to him, “Teacher, we want to see a sign from you.”",
    "ESV": "Then some of the scribes and Pharisees answered him, saying, “Teacher, we wish to see a sign from you.”",
    "AMP": "Then some of the scribes and Pharisees said to Him, “Teacher, we want to see a sign (attesting miracle) from You [proving that You are what You claim to be].”",
    "NLT": "One day some teachers of religious law and Pharisees came to Jesus and said, “Teacher, we want you to show us a miraculous sign to prove your authority.”"
  },
  "Matthew 12:38-39": {
    "KJV": "38 Then certain of the scribes and of the Pharisees answered, saying, Master, we would see a sign from thee. 39 But he answered and said unto them, An evil and adulterous generation seeketh after a sign; and there shall no sign be given to it, but the sign of the prophet Jonas:",
    "NKJV": "38 Then some of the scribes and Pharisees answered, saying, “Teacher, we want to see a sign from You.” 39 But He answered and said to them, “An evil and adulterous generation seeks after a sign, and no sign will be given to it except the sign of the prophet Jonah.",
    "NIV": "38 Then some of the Pharisees and teachers of the law said to him, “Teacher, we want to see a sign from you.” 39 He answered, “A wicked and adulterous generation asks for a sign! But none will be given it except the sign of the prophet Jonah.",
    "ESV": "38 Then some of the scribes and Pharisees answered him, saying, “Teacher, we wish to see a sign from you.” 39 But he answered them, “An evil and adulterous generation seeks for a sign, but no sign will be given to it except the sign of the prophet Jonah.",
    "AMP": "38 Then some of the scribes and Pharisees said to Him, “Teacher, we want to see a sign (attesting miracle) from You [proving that You are what You claim to be].” 39 But He replied, “An evil and adulterous generation [morally unfaithful to God] craves a sign; but no sign will be given to it except the sign of the prophet Jonah;",
    "NLT": "38 One day some teachers of religious law and Pharisees came to Jesus and said, “Teacher, we want you to show us a miraculous sign to prove your authority.” 39 But Jesus replied, “Only an evil, adulterous generation would demand a miraculous sign; but the only sign I will give them is the sign of the prophet Jonah."
  },
  "Matthew 12:41": {
    "KJV": "The men of Nineveh shall rise in judgment with this generation, and shall condemn it: because they repented at the preaching of Jonas; and, behold, a greater than Jonas is here.",
    "NKJV": "The men of Nineveh will rise up in the judgment with this generation and condemn it, because they repented at the preaching of Jonah; and indeed a greater than Jonah is here.",
    "NIV": "The men of Nineveh will stand up at the judgment with this generation and condemn it; for they repented at the preaching of Jonah, and now something greater than Jonah is here.",
    "ESV": "The men of Nineveh will rise up at the judgment with this generation and condemn it, for they repented at the preaching of Jonah, and behold, something greater than Jonah is here.",
    "AMP": "The men of Nineveh will stand up [as witnesses] at the judgment with this generation, and will condemn it because they repented at the preaching of Jonah; and look, Something greater than Jonah is here.",
    "NLT": "The people of Nineveh will stand up against this generation on judgment day and condemn it, for they repented of their sins at the preaching of Jonah. And now someone greater than Jonah is here—but you refuse to repent."
  },
  "Matthew 12:41-42": {
    "KJV": "41 The men of Nineveh shall rise in judgment with this generation, and shall condemn it: because they repented at the preaching of Jonas; and, behold, a greater than Jonas is here. 42 The queen of the south shall rise up in the judgment with this generation, and shall condemn it: for she came from the uttermost parts of the earth to hear the wisdom of Solomon; and, behold, a greater than Solomon is here.",
    "NKJV": "41 The men of Nineveh will rise up in the judgment with this generation and condemn it, because they repented at the preaching of Jonah; and indeed a greater than Jonah is here. 42 The queen of the South will rise up in the judgment with this generation and condemn it, for she came from the ends of the earth to hear the wisdom of Solomon; and indeed a greater than Solomon is here.",
    "NIV": "41 The men of Nineveh will stand up at the judgment with this generation and condemn it; for they repented at the preaching of Jonah, and now something greater than Jonah is here. 42 The Queen of the South will rise at the judgment with this generation and condemn it; for she came from the ends of the earth to listen to Solomon’s wisdom, and now something greater than Solomon is here.",
    "ESV": "41 The men of Nineveh will rise up at the judgment with this generation and condemn it, for they repented at the preaching of Jonah, and behold, something greater than Jonah is here. 42 The queen of the South will rise up at the judgment with this generation and condemn it, for she came from the ends of the earth to hear the wisdom of Solomon, and behold, something greater than Solomon is here.",
    "AMP": "41 The men of Nineveh will stand up [as witnesses] at the judgment with this generation, and will condemn it because they repented at the preaching of Jonah; and look, Something greater than Jonah is here. 42 The Queen of the South (Sheba) will rise up [as a witness] at the judgment with this generation, and will condemn it because she came from the ends of the earth to hear the wisdom of Solomon; and look, Something greater than Solomon is here.",
    "NLT": "41 The people of Nineveh will stand up against this generation on judgment day and condemn it, for they repented of their sins at the preaching of Jonah. And now someone greater than Jonah is here—but you refuse to repent. 42 The queen of Sheba will also stand up against this generation on judgment day and condemn it, for she came from such a distant land to hear the wisdom of Solomon. And now someone greater than Solomon is here—but you refuse to listen."
  },
  "John 3:16-18": {
    "KJV": "16 For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life. 17 For God sent not his Son into the world to condemn the world; but that the world through him might be saved. 18 He that believeth on him is not condemned: but he that believeth not is condemned already, because he hath not believed in the name of the only begotten Son of God.",
    "NKJV": "16 For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life. 17 For God did not send His Son into the world to condemn the world, but that the world through Him might be saved. 18 “He who believes in Him is not condemned; but he who does not believe is condemned already, because he has not believed in the name of the only begotten Son of God.",
    "NIV": "16 For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life. 17 For God did not send his Son into the world to condemn the world, but to save the world through him. 18 Whoever believes in him is not condemned, but whoever does not believe stands condemned already because they have not believed in the name of God’s one and only Son.",
    "ESV": "16 “For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life. 17 For God did not send his Son into the world to condemn the world, but in order that the world might be saved through him. 18 Whoever believes in him is not condemned, but whoever does not believe is condemned already, because he has not believed in the name of the only Son of God.",
    "AMP": "16 “For God so [greatly] loved and dearly prized the world, that He [even] gave His [One and] only begotten Son, so that whoever believes and trusts in Him [as Savior] shall not perish, but have eternal life. 17 For God did not send the Son into the world to judge and condemn the world [that is, to initiate the sentence of judgment of the world], but that the world might be saved through Him. 18 He who believes and trusts in Him [as Savior] is not judged [there is no judgment for him, he a member of Christ’s family]; but he who does not believe [and has decided to reject Him as Savior] is judged already [that is, has already been convicted and sentenced], because he has not believed and trusted in the name of the [One and] only begotten Son of God [the Savior who lives inside those who believe].",
    "NLT": "16 “For this is how God loved the world: He gave his one and only Son, so that everyone who believes in him will not perish but have eternal life. 17 God sent his Son into the world not to judge the world, but to save the world through him. 18 “There is no judgment against anyone who believes in him. But anyone who does not believe in him has already been judged for not believing in God’s one and only Son."
  }

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
    lessonDate: "July 19, 2026", 
    lessonTitle: "UNREALISTIC DEMANDS",

    memoryVerse:
        "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you. Matt. 6:33",
    memoryVerseRef: "Matthew 6:33", 

    introScriptures: ["Matthew 12:38-42"],

    introduction:
        "If you could imagine what God and Jesus has been through to save mankind, you won't attach any string to your worship/service to God. Many people can't serve God as demanded just because they aren't sure of what they'll derive from Him, Even though as slaves we haven't much choice because we were bought with a price - 1Cor. 6-20, Rom. 6:18. He revealed the benefits of our service to him - Matt. 6:33. What more does a man need to be sold out completely to Jesus Christ?",

    aims:
        "To stop Christian believers from excusing themselves of their negligence towards God.",

    objectives:
        "To encourage believers to follow and serve Jesus without reservation.",
    objectiveScriptures: [],
    
    lessonIntro:
        "These worshippers of God were still not satisfied with all the proofs that Jesus is the Messiah and requested for further signs to draw their conclusion. They were disappointed as Jesus didn't give them a sign they had thought to receive. Many of you Christians or church goers shall be disappointed in like manner because inspite of all you have seen and received in Christ you still required God to prove himself with a blessing or miracle before your loyalty to him.",
        
    lessonIntroScriptures: ["Matthew 12:38-42"],
    
    lessonPoints: [
        {
            title: "THE BELIEVING UNBELIEVERS",
            content:
                "They even called him master showing that they were not unbelievers yet they still had their doubts like some of you today.",
            scriptures: ["Matthew 12:38"],
            subPoints: [],
        },
        {
            title: "REQUEST FOR PERSUASIVE SIGNS",
            content:
                "People excuse themselves from serving and worshiping God for selfish reasons like these men of old. They have seen enough proof to yield to Jesus but were still adamant.",
            scriptures: ["Matthew 12:38-39"],
            subPoints: [],
        },
        {
            title: "BELIEVE BY THE EXISTING SIGNS",
            content:
                "You don't need any of the conditions you are giving to God to serve him if you want to because there are so many existing reasons in your life and in others.",
            scriptures: [],
            subPoints: [],
        },
        {
            title: "THE FAITH OF THE UNBELIEVER",
            content:
                "If what the Lord has done in your life is done in the lives of unbelievers they will remain in the courts of the Lord. Nineveh demonstrated this fact while Israel disregarded God's warnings.",
            scriptures: ["Matthew 12:41", "Jonah 3:5-10"],
            subPoints: [],
        },
        {
            title: "GREATER PUNISHMENT",
            content:
                "If God proposed punishment for unbelieving nations should they defy his servants how much more will the punishment be greater if we defy his only begotten son.",
            scriptures: ["Matthew 12:41-42", "John 3:16-18"],
            subPoints: [],
        },
    ],

    conclusion:
        "Don't seek further proof to believe or serve God. Make up your mind and be totally yielded to Jesus now.",

    conclusionScriptures: ["1 Corinthians 6:20", "Romans 6:18", "Matthew 6:33"],

    prayerPoints: [
        "Lord, deliver me from the attitude of demanding signs and wonders before offering You my complete loyalty and service.",
        "Father, help me to remain satisfied with the greatest proof of Your love on the cross and serve You without any hidden conditions.",
        "Oh Lord, grant me the grace to recognize the existing blessings and testimonies in my life as more than enough reasons to remain totally yielded to You!"
    ],
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
    const animatedText = "Complelling Favour - Genesis 39:1-6, Neh. 2:2-8".split("");

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center z-50">
            <div className="text-center">
                <div className="relative mb-8">
                    <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center shadow-2xl animate-pulse">
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

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Life Gate Ministries Worldwide
                </h1>
                <p className="text-xl text-white/90 mb-8">
                    Sunday School Lessons
                </p>

                {/* Single-color glowing neon text */}
                <div className="flex justify-center mb-6 text-3xl md:text-4xl font-extrabold">
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
                            UNREALISTIC DEMANDS
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
                                    Text: Matthew 12:38-42
                                </h3>
                                <div className="flex gap-2 flex-wrap">
                                    <button
                                        onClick={() =>
                                            showBibleVersions(
                                                "Matthew 12:38-42"
                                            )
                                        }
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
                                    >
                                        <BookOpen size={16} />
                                        Read Matthew 12:38-42
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
                                                        "Romans 6:18"
                                                    )
                                                }
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition flex items-center gap-2 text-sm shadow-md"
                                            >
                                                <BookOpen size={16} />
                                                Romans 6:18
                                            </button>
                                            <button
                                                onClick={() =>
                                                    showBibleVersions(
                                                        "1 Corinthians 6:20"
                                                    )
                                                }
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition flex items-center gap-2 text-sm shadow-md"
                                            >
                                                <BookOpen size={16} />
                                                1 Corinthians 6:20
                                            </button>
                                            <button
                                                onClick={() =>
                                                    showBibleVersions(
                                                        "Matthew 6:33"
                                                    )
                                                }
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition flex items-center gap-2 text-sm shadow-md"
                                            >
                                                <BookOpen size={16} />
                                                Matthew 6:33
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
