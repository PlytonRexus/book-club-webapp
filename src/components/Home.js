import React, { Component } from 'react';
import { lread } from '../middleware/localStorage';
import Header from './Header';
import '../css/Home.css';

// This is a dangerously hard-coded component.
// Be careful when editing.

class Home extends Component {
    render = () => { 
        return (
            <div>
                <Header header={`Hello, ${lread('bkclbSid').split(',')[1]}!`}/>
                <div className="home-card">
                    <div className="home-content">
                    <div>
        <p className="c0 c3"><span className="c2"></span></p>
    </div>
    <p className="c0"><span>*</span><span className="c4">Current goals - finish as many of these titles (at least 1) as you can,
            and &nbsp;write short complete reviews of as many of those as possible by 15th April 2020</span><span
            className="c2">*</span></p>
    <p className="c0 c3"><span className="c2"></span></p>
    <p className="c0"><span className="c4">Update the excel sheet as you progress: </span><span className="c1"><a className="c5"
                href="https://www.google.com/url?q=https://docs.google.com/spreadsheets/d/1o63L4dg396u5nsNMEgZkLGrlHOlNc5zWDTHKyq1BpKg/edit?usp%3Dsharing&amp;sa=D&amp;ust=1589819611110000">https://docs.google.com/spreadsheets/d/1o63L4dg396u5nsNMEgZkLGrlHOlNc5zWDTHKyq1BpKg/edit?usp=sharing</a></span>
    </p>
    <p className="c0 c3"><span className="c2"></span></p>
    <p className="c0"><span className="c2">The book list, as decided during the previous session, was- </span></p>
    <p className="c0"><span className="c2">1. Book Thief</span></p>
    <p className="c0"><span className="c2">2. Little Prince</span></p>
    <p className="c0"><span className="c2">3. The Spinning Silver</span></p>
    <p className="c0"><span className="c2">4. Memoirs of a Geisha</span></p>
    <p className="c0"><span className="c2">5. Mistborn</span></p>
    <p className="c0"><span className="c2">6. Local Author (eg. Hansda sowvendra shekar)</span></p>
    <p className="c0"><span className="c2">7. Sapiens</span></p>
    <p className="c0"><span className="c2">8. Do all roads lead to Jerusalem</span></p>
    <p className="c0"><span className="c2">(You can obviously read other books as well, just make sure to read atleast one of
            them before you begin reading any other.)</span></p>
    <p className="c0 c3"><span className="c2"></span></p>
    <p className="c0"><span>*</span><span className="c4">Which one should I start with?</span><span className="c2">*</span></p>
    <p className="c0"><span>- &nbsp;Check out this link, if you are new to reading pick any one of these book: </span><span
            className="c1"><a className="c5"
                href="https://www.google.com/url?q=http://vignette3.wikia.nocookie.net/4chanlit/images/e/e2/1365475090228.jpg&amp;sa=D&amp;ust=1589819611113000">http://vignette3.wikia.nocookie.net/4chanlit/images/e/e2/1365475090228.jpg</a></span><span
            className="c2">&nbsp;(Replace Lolita with Pale Fire by same author if you don&#39;t like Lolita&#39;s
            themes.)</span></p>
    <p className="c0"><span className="c2">- Depends on your reading experience and tastes, ask on the group.</span></p>
    <p className="c0"><span className="c2">- Some are heavy on ideas, some on prose. Some are slow, others are fast.</span></p>
    <p className="c0"><span className="c2">- Recommended starting points are 1984, Brave New World and Fahrenheit 451, Lord of
            the flies</span></p>
    <p className="c0"><span className="c2">- Some books contain explicitly sexual/taboo overtones.</span></p>
    <p className="c0"><span className="c2">- Let us know if you can&#39;t read those and we&#39;ll recommend safer titles (on
            the group)</span></p>
    <p className="c0 c3"><span className="c2"></span></p>
    <p className="c0"><span>*</span><span className="c4">Where do I get these books?</span><span className="c2">*</span></p>
    <p className="c0"><span className="c2">- e-books available at </span></p>
    <p className="c0"><span>-- </span><span className="c1"><a className="c5"
                href="https://www.google.com/url?q=http://b-ok.org/&amp;sa=D&amp;ust=1589819611116000">http://b-ok.org/</a></span><span
            className="c2">&nbsp;</span></p>
    <p className="c0"><span>-- </span><span className="c1"><a className="c5"
                href="https://www.google.com/url?q=http://libgen.io/&amp;sa=D&amp;ust=1589819611116000">http://libgen.io/</a></span><span>&nbsp;or
        </span><span className="c1"><a className="c5"
                href="https://www.google.com/url?q=http://libgen.is/&amp;sa=D&amp;ust=1589819611116000">http://libgen.is/</a></span><span>&nbsp;</span>
    </p>
    <p className="c0"><span className="c2">-- mobilism.org</span></p>
    <p className="c0"><span>-- </span><span className="c1"><a className="c5"
                href="https://www.google.com/url?q=https://www.reddit.com/r/Piracy/comments/2oftbu/guide_the_idiot_proof_guide_to_downloading_ebooks/&amp;sa=D&amp;ust=1589819611117000">https://www.reddit.com/r/Piracy/comments/2oftbu/guide_the_idiot_proof_guide_to_downloading_ebooks/</a></span><span
            className="c2">&nbsp;</span></p>
    <p className="c0"><span className="c2">-- The app &lsquo;Anybooks&rsquo;- provides a lot many ebooks.</span></p>
    <p className="c0"><span className="c2">- We recommend getting a Kindle if possible.</span></p>
    <p className="c0"><span className="c2">- Use Amazon app / lithium e-book reader/ any other you prefer if reading on
            phone.</span></p>
    <p className="c0"><span className="c2">- Use Calibre if reading on laptop/PC </span></p>
    <p className="c0"><span className="c2">&nbsp; &nbsp;https://calibre-ebook.com/download</span></p>
    <p className="c0"><span className="c2">- If you want paperbacks, visit your nearest public library or order from
            Amazon.</span></p>
    <p className="c0"><span className="c2">- use Audible for audiobooks or torrent them.</span></p>
    <p className="c0"><span>- Book club of IIT ISM also has some of these books. If it doesn&rsquo;t, request here and they
            will try to buy it later &mdash; </span><span className="c1"><a className="c5"
                href="https://www.google.com/url?q=https://forms.gle/Aoh8qwH1EcW46hEC6&amp;sa=D&amp;ust=1589819611119000">https://forms.gle/Aoh8qwH1EcW46hEC6</a></span><span
            className="c2">&nbsp;</span></p>
    <p className="c0 c3"><span className="c2"></span></p>
    <p className="c0 c3"><span className="c2"></span></p>
    <p className="c0 c3"><span className="c2"></span></p>
    <p className="c0"><span>* </span><span className="c4">What&#39;s the need for this group?</span><span className="c2">*</span>
    </p>
    <p className="c0"><span className="c2">- These books are some of the best popular books ever written, and you will
            definitely want to discuss them with others if you read them.</span></p>
    <p className="c0"><span className="c2">- You might get stuck at a point in a book, so others will help with comprehension
            and encouragement.</span></p>
    <p className="c0"><span className="c2">- It will keep you interested.</span></p>
    <p className="c0"><span className="c2">- Be a marker of progress.</span></p>
    <p className="c0"><span className="c2">- encourage others too.</span></p>
    <p className="c0 c3"><span className="c2"></span></p>
    <p className="c0"><span>*</span><span className="c4">&nbsp;I want to read other books.</span><span className="c2">*</span></p>
    <p className="c0"><span className="c2">- Go ahead, as long as you read some of those mentioned here.</span></p>
    <p className="c0"><span className="c2">- If you want to add a book to the list, ask on the group.</span></p>
    <p className="c0"><span className="c2">- If you want to read a specific type of literature like Poetry, Fantasy fiction etc.
            then again, post on the group. We have recommendations.</span></p>
    <p className="c0 c3"><span className="c2"></span></p>
    <p className="c0"><span>*</span><span className="c4">Bu-but... what&#39;s the point of reading all these?</span><span
            className="c2">*</span></p>
    <p className="c0"><span className="c2">- So that you know of the very basic common themes and ideas prevalent in public
            English discourse around the world.</span></p>
    <p className="c0"><span className="c2">- These books are so important, many of their words have entered the dictionary.
        </span></p>
    <p className="c0"><span className="c2">- You will never create anything of any worth or quality (arguments, speeches,
            stories, poems, articles etc. all included) if you don&#39;t read/listen to good works. This will get you
            started on the path.</span></p>
    <p className="c0 c3"><span className="c2"></span></p>
    <p className="c0"><span className="c7 c4">Try to notify on the group when starting a book, definitely do it when you finish
            one.</span></p>
    <p className="c0 c3"><span className="c2"></span></p>
    <p className="c0"><span className="c4 c7">Feel free to talk about the literature of any language in general or
            otherwise.</span></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;