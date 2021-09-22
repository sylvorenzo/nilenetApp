import React, {Component} from 'react'
import { ScrollView, StatusBar, Text , StyleSheet} from 'react-native'
import {Card} from 'react-native-paper';

// tools for success content
class ToolScreen extends Component{
    constructor(props){
        super(props);
        this.state ={
            bullet: '\u2022'
        }
    }

    render(){
        return(
            <ScrollView>
                <StatusBar backgroundColor="#f85900"/>
                <Card style={styles.card}>
                    <Text style={styles.title}>1.Slack</Text>
                    <Text style={styles.content}>
                    Slack is a 21st-century team communication tool. 
                    This means that the days of group messages exploding and generating 
                    200 alerts at once are over, as are the days of missing messages 
                    addressed at you and several groups mingling on the same setup. 
                    However, communication provides much more than simply this basic capacity.
                    </Text>
                </Card>
                <Card style={styles.card}>
                    <Text style={styles.title}>2.G-SUITE</Text>
                    <Text style={styles.content}>
                    The GSuite was created by Google to provide businesses a comprehensive 
                    set of tools. 
                    With the applications in the GSuite, 
                    you can buy a domain, set up an email client, 
                    analyse website statistics, create and manage ad campaigns, 
                    and much more for a cheap price. Keeping all of your company needs 
                    centralized around your branded domain and within the Google platform 
                    will provide you peace of mind in knowing that everything is 
                    taken care of.
                    </Text>
                </Card>
                <Card style={styles.card}>
                    <Text style={styles.title}>3.GOCO</Text>
                    <Text style={styles.content}>
                    HR is a messy, complicated, and paper-heavy profession. 
                    Many business owners are migrating their HR processes to 
                    contemporary all-in-one platforms like GoCo.io these days. 
                    Employee onboarding and offboarding, document management, 
                    time-off monitoring, performance management, compliance, 
                    and benefits administration are all made easier with this 
                    web-based human resources and benefits platform. 
                    Integration with currency payroll and administration 
                    software provides the capabilities you want without requiring you to 
                    think about it or deal with paperwork.
                    </Text>
                </Card>
                <Card style={styles.card}>
                    <Text style={styles.title}>4. GoodHire</Text>
                    <Text style={styles.content}>
                    Background checks, identity verifications, reference checks, 
                    employment verifications, pre-hire skills testing, credit checks, 
                    drug screens, driving record checks, and education/degree verifications 
                    are all required when hiring new employees, especially for small firms. 
                    All of this is done through GoodHire, which requires no paperwork and only 
                    a few taps on your smartphone. 
                    Furthermore, they provide findings in less than 24 hours. 
                    Expanding your workforce may be easy, 
                    and it can help your business to function more smoothly than ever before.
                    </Text>
                </Card>
                <Card style={styles.card}>
                    <Text style={styles.title}>5. UpWork</Text>
                    <Text style={styles.content}>
                    Some teams choose to work as independent contractors rather than employees, 
                    and Upwork caters to those entrepreneurs. 
                    It enables company owners to engage freelancers for a variety of tasks. 
                    Whether you require web developers, graphics designers, social media managers, 
                    or other services, Upwork is certain to have someone who can help you build your business. Their review, bidding, and reference 
                    system gives you peace of mind when it comes to evaluating anybody you want to deal with.
                    </Text>
                </Card>
                <Card style={styles.card}>
                    <Text style={styles.title}>6. Quora</Text>
                    <Text style={styles.content}>
                    Quora is a crowdsourced question and answer site. 
                    While it may seem somewhat like Yahoo Answers, 
                    Quora requires all users to have verified identities and encourages responders 
                    to fill out as much information about their backgrounds as possible on their accounts. 
                    This implies that anytime you or your company has a query about something outside 
                    of your field of expertise, 
                    you'll almost certainly be able to locate an expert to answer your question on Quora.
                    </Text>
                </Card>
                <Card style={styles.card}>
                    <Text style={styles.title}>7. Telzio</Text>
                    <Text style={styles.content}>
                    Businesses may use Telzio to set up an office phone system entirely via the internet. 
                    Teams can manage calls and messages across all of their devices using Telzio 
                    from any place. Telzio offers an easier method for companies to set up, manage, 
                    and maintain a phone system for their 
                    employees, thanks to a clear and intuitive online interface, 
                    simple pricing, and no lock-in or 
                    termination costs.
                    </Text>
                </Card>
                <Card style={styles.card}>
                    <Text style={styles.title}>8. Intercom</Text>
                    <Text style={styles.content}>
                    The lack of contact with consumers is one of the most aggravating 
                    parts of owning a business, especially one that is dependent on the internet. 
                    Failure to educate and comprehend customers leads to bad user interface decisions, 
                    a lack of knowledge of problems and wants, and a negative user experience. 
                    Intercom provides a range of features for your web customers, including live chat, 
                    education, and more, 
                    making it simpler to interact, engage, and communicate with them.
                    </Text>
                </Card>
                <Card style={styles.card}>
                    <Text style={styles.title}>9. SalesLoft</Text>
                    <Text style={styles.content}>
                    SalesLoft can assist you in attracting and retaining new clients, 
                    particularly if those customers are other businesses. 
                    With a built-in sales dialler, email that is created for sales from the bottom up, 
                    and deep connections with the technologies you're already using like Salesforce, 
                    their platform improves the productivity and effectiveness of salespeople.
                     Overall, SalesLoft aids in the conversion and retention of customers.
                    </Text>
                </Card>
                <Card style={styles.card}>
                    <Text style={styles.title}>10. Trello</Text>
                    <Text style={styles.content}>
                    Trello, which was recently bought for $425 million by Atlassian, 
                    the developers of HipChat, is proving to be one of the best team and task management 
                    tools available. With the ability to create different boards and cards, 
                    specify due dates, and add comments, among other things. 
                    Trello makes task organization and tracking as straightforward as possible. 
                    Trello offers a range of options and getting started on Trello may be free for 
                    individuals and small teams, with cost increasing gradually based on how 
                    quickly the organization expands.
                    </Text>
                </Card>
                <Card style={styles.card}>
                    <Text style={styles.title}>11. Blinkist</Text>
                    <Text style={styles.content}>
                    Blinkist provides essential takeaways from the world's finest notification books in text and audio format.
                    Blinkist's staff summarizes non-fiction works, allowing you to grasp important points in 15 minutes or less.
                    How this technology helps entrepreneurs: 
                    </Text>
                    <Text style={styles.content}>
                        {this.state.bullet} You still get the book's benefits without having to read it for days.
                    </Text>
                    <Text style={styles.content}>
                        {this.state.bullet} You may download and use the app for free, and it provides 
                        you access to the daily choices.
                    </Text>
                    <Text style={styles.content}>
                    Blinkist Premium is required to enjoy the full service and features of the site. You'll get access to over 3000 book summaries in over 27 categories, ranging from politics to entrepreneurship and small company.
                    Blinkist Premium is available for a 7-day free trial.

                    </Text>
                </Card>
                <Card style={styles.card}>
                    <Text style={styles.title}>12. Wix</Text>
                    <Text style={styles.content}>
                    Wix has the advantage of providing templates, so you don't have to come up with a concept from scratch.

                    The templates are interchangeable and customizable, allowing you to create exactly the appearance and feel you want for your online presence.
                    The following are some of the ways that this tool may help your startup:
                    </Text>
                  <Text style={styles.content}>
                    {this.state.bullet} Hundreds of templates to assist you 
                    in selecting from a huge number of designer-made alternatives.
                  </Text>
                  <Text style={styles.content}>
                    {this.state.bullet} Drag and drop elements into your creation using user-friendly designs. 
                    Anything on your website may be changed, customized, or added.
                  </Text>
                  <Text style={styles.content}>
                    {this.state.bullet} With a personalized domain name, 
                    you may establish a professional online presence.
                  </Text>
                  <Text style={styles.content}>
                    {this.state.bullet} This website builder now includes mobile responsive site choices, 
                    ensuring that your site looks amazing on any device.
                  </Text>
                </Card>
                <Card style={styles.card}>
                    <Text style={styles.title}>13. MoneyVersity</Text>
                    <Text style={styles.content}>
                    We've mentioned some business-related applications, 
                    but your personal money may also require care.
                    Old Mutual's MoneyVersity is a personal financial tool. 
                    It's intended to assist you in making the most of your money.
                    </Text>
                    <Text style={styles.content}>
                    Entrepreneurs can benefit from this tool in the following ways: 
                    </Text>
                  <Text style={styles.content}>
                    {this.state.bullet} MoneyVersity provides educational and entertaining videos, calculators, 
                    infographics, essays, and games to assist you in managing your own money.
                  </Text>
                  <Text style={styles.content}>
                    {this.state.bullet} This tool provides a range of 
                    courses and subjects to assist you in better understanding your money.
                  </Text>
                </Card>
                <Card style={styles.card}>
                    <Text style={styles.title}>14. Google Analytics</Text>
                    <Text style={styles.content}>
                    You may use Google Analytics to track the traffic to your website for free. 
                    It can tell you how many visitors arrived to your site, 
                    from where they came, how long they remained, and which pages they looked at.
                    </Text>
                    <Text style={styles.content}>
                    It has the ability to show you:
                    </Text>
                  <Text style={styles.content}>
                    {this.state.bullet} Where do your visitors make the most clicks?
                  </Text>
                  <Text style={styles.content}>
                    {this.state.bullet} When you start utilizing SEO tactics, you can track how much 
                    traffic is flowing to your sites and whether or not your SEO is functioning appropriately.
                  </Text>
                </Card>
            </ScrollView>
        )
    }
}
export default ToolScreen;
const styles = StyleSheet.create({


    content:{
        padding:5,
        fontFamily:'Georgia,serif',
        fontSize: 15
    },
    title:{
        fontFamily:'Georgia, serif',
        fontSize: 25,
        marginTop: 15,
        margin:5,
        textAlign: 'left',
        fontWeight:'bold'

    },
    card:{
        minHeight:200,
        margin: 5,
        justifyContent: 'center',
        textAlign:'center'
    }
})