import React, {Component} from 'react';
import { ScrollView, Text, StyleSheet,Linking, TouchableOpacity as Touch, StatusBar} from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Card,
  } from 'react-native-paper';

class FinanceScreen extends Component{

    constructor(props){
        super(props);
        this.state ={
            bullet: '\u2022'
        }
    }

    render(){
        return(
            <ScrollView>
                <StatusBar backgroundColor='#07adb3'/>
                <Card style={styles.card}>
                    <Text style={styles.title}>Financing For Start-Up's:</Text>
                    <Text style={styles.content}>
                    The biggest challenge when starting a business is the finances needed for the business understanding the basics of finance as an entrepreneur is very important 
                    which include revenue, expenses, inventory, and taxes. 
                    managing your finances well will do wonders for your business. 
                    As we all know that Financing is the most important characteristic for small businesses.
                    </Text>
                </Card>
                <Card style={styles.card}>
                    <Text style={styles.title}>Entrepreneurial Finance</Text>
                    <Text style={styles.content}>
                    It is the study of value and resources allocation, applied to new ventures. 
                    It addresses key questions which challenge all entrepreneurs. 
                    Entrepreneurial finance is important because it brings different people and stuff together to create something new and money is the key resource to creating something new. 
                    Getting the right money by choosing the right investors. 
                    There are different financial options for small businesses.
                    </Text>
                </Card>
                <Card style={styles.card}>
                    <Text style={styles.title}>Investor</Text>
                    <Text style={styles.content}>
                    It is hard for investors to choose between a lot of business plans, 
                    it is a difficult decision to make. 
                    You ask many questions on who is worthy of funding. 
                    As someone who is looking to start a business you must 
                    consider the things that investors look for in a business plan 
                    you need to impress your investor in order to get things done.
                    </Text>
                    <Text style={styles.content}>Consider this when looking for investors: </Text>
                    <Text style={styles.content}>
                        {this.state.bullet} Having an impressive business plan. 
                        It is essential to have it so that your investors see that 
                        you have a strong plan to meet your business goals, 
                        they help with growing your business.
                    </Text>
                    <Text style={styles.content}>
                    {this.state.bullet} Financial plan. You need to document your current financial plans for your business, 
                    your financial goals and how you plan to achieve them.
                    </Text>
                    <Text style={styles.content}>
                        {this.state.bullet} Start-up pricing. 
                        These are the costs needed to be spent to get your new business running.
                    </Text>
                    <Text style={styles.content}>
                        {this.state.bullet} Who the investor is? 
                        You might want to know the structural differences between investors. 
                        They are those investors that use their own money to invest in businesses and they are those that use money coming from someone or an institution, a pension fund, etc. 
                    </Text>
                    <Text style={styles.content}>
                        {this.state.bullet} What motivates the investors? 
                        Whether it is money or wanting to get involved in the business venture. 
                        It is very crucial for you to understand the motivation to see if you will work well with them.
                    </Text>
                    <Text style={styles.content}>
                        {this.state.bullet} Before you think about choosing your investor 
                        you get a period where you and the investor get to know each other, 
                        you build trust and a business relationship to get the idea of how working 
                        with that investor would be like.
                    </Text>
                    <Text style={styles.content}>
                    After researching on what you might look for in an investor 
                    then you need think about what an investor looks for in a start-up business?
                    </Text>
                    <Text style={styles.content}>
                        {this.state.bullet} A successful team. 
                        A team that will succeed in executing your business 
                        idea bringing their different skills to make a success.
                    </Text>
                    <Text style={styles.content}>
                        {this.state.bullet} A good business idea. It should be something that motivates you 
                        and that is in demand in the industry. 
                        It should include innovation, making something new that improves the business world.
                    </Text>
                    <Text style={styles.content}>
                        {this.state.bullet} Copyright and intellectual property. 
                        Investors prefer investing in start-ups that have patents, copyright, 
                        having an issued patent. 
                        Look for copyright and intellectual property information.
                    </Text>
                    <Text style={styles.content}>
                        {this.state.bullet} Market share and size.
                    </Text>
                    <Text style={styles.content}>
                        {this.state.bullet} The future of the business which is included in the business plan.
                    </Text>
                    <Text style={styles.content}>
                        {this.state.bullet} Return on investment.  
                        The kind of returns they expect from their investments.
                    </Text>
                </Card>
                <Card style={styles.card}>
                    <Text style={styles.title}>Angel Investors</Text>
                    <Text style={styles.content}>
                    Is a private person or group that provides funding backup for entrepreneurs. 
                    They invest their own money so that they get profits in return. 
                    They might invest when you start your business or your having difficult times.  
                    It can be one person or other entrepreneurs wanting to help another 
                    entrepreneur in the same sector. 
                    They are usually considered in the second stage of your start-up. 
                    They are part of the equity financing; 
                    they can ask for a certain percentage of your business they offer you capital 
                    in exchange for ownership stake.
                    </Text>
                    <Text style={styles.content}>They look for: </Text>
                    <Text style={styles.content}>
                        {this.state.bullet} Founder. 
                        If you are committed to the business and if your team is suitable for the business.
                    </Text>
                    <Text style={styles.content}>
                        {this.state.bullet} Your target markets. 
                        If people will be interested in your business.
                    </Text>
                    <Text style={styles.content}>
                        {this.state.bullet} Timeline of your business. 
                        When will you start running your business?
                    </Text>
                    <Text style={styles.content}>
                    You need to think about the things that the investment will provide for your business excluding money. 
                    Like expanding your networking opportunities in the sector, 
                    you are doing business in. will they give the necessary and honest advice? 
                    Will they guide you?
                        The process of finding angel investors.
                    </Text>
                </Card>
                <Card style={styles.card}>
                    <Text style={styles.title}>Venture Capitalist</Text>
                    <Text style={styles.content}>
                    Is a form of private equity financing that is provided by venture capital firms 
                    or funds to start-ups, early-stage, 
                    and emerging companies that have been deemed to have 
                    high growth potential or which have demonstrated high growth 
                    (in terms of number of employees, annual revenue, scale of operations).
                    </Text>
                    <Text style={styles.content}>
                    Venture capital is a type of equity investment that is more focused on early-stage 
                    start-ups and SMEs that have high growth potential. 
                    </Text>
                    <Text style={styles.content}>
                    The benefits of having VC as an investor:
                    </Text>
                    <Text style={styles.content}>
                    {this.state.bullet} SMME's have long-term equity finances a solid capital for the growth of their businesses, 
                    gaining capital and success of your business.
                    </Text>
                    <Text style={styles.content}>
                    {this.state.bullet} They assist you with operating your business 
                    with the past experiences they have from past SMME's.
                    </Text>
                    <Text style={styles.content}>
                    {this.state.bullet} They have a strong network of contacts in 
                    different sectors which an be an advantage, 
                    by adding more value to your business.
                    </Text>
                    <Text style={styles.content}>
                        What VC investors look for in SMME's:
                    </Text>
                    <Text style={styles.content}>
                    {this.state.bullet} Driven team and experience. 
                    Investors look for a team that has determination and driven, 
                    a team that is willing to break through walls to get to where they want 
                    to be which is getting their business up and running. They look for experience, 
                    how much knowledge you have in the certain area of business.
                    </Text>
                    <Text style={styles.content}>
                    {this.state.bullet} Market-based validation. 
                    Does your product or service have a use in the market? 
                    Will you be able to gain customers, and will they see value in your business? 
                    Does your business plan have a solid revenue potential?
                    </Text>
                    <Text style={styles.content}>
                    {this.state.bullet} Scalability. The scalability of your business, 
                    the size of the market that you are entering.
                    </Text>
                </Card>
                <Card style={styles.card}>
                    <Text style={styles.title}> Start-Up Business Loans: </Text>
                    <Text style={styles.content}>
                    Is money loaned to you to help start and operate your business, 
                    like any loan you must pay it back. You need determination and effort to get yourself 
                    a business loan, you can get it from the bank. It might be challenging 
                    to get a start-up loan because most businesses fail within a year and the 
                    banks know that it is a risk to loan money to a business. 
                    It is important that you have a great business plan.
                    </Text>
                </Card>
                <Card style={styles.card}>
                    <Text style={styles.title}> Crowd Funding: </Text>
                    <Text style={styles.content}>
                    Crowd funding is the practice of funding a project or venture by raising 
                    small amounts of money from many people, typically via the Internet. 
                    Crowd funding can play an important role in reducing the 
                    financing needs of African SMMEs. 
                    It provides you with a new way of raising your capital.
                    </Text>
                    <Text style={styles.content}>
                    How it works?

                    </Text>
                    <Text style={styles.content}>
                    An entrepreneur posts a business pitch on any crowdfunding platform to get 
                    recognition and raise the capital of their business from funders. 
                    With the increased use of mobile network, 
                    it allows business transactions to occur online.
                    </Text>
                    <Text style={styles.content}>
                    Things to consider before Crowd Funding:
                    </Text>
                    <Text style={styles.content}>
                        {this.state.bullet} Crowd funding platform. 
                        Check if the site is suitable for your specific fundraiser.
                    </Text>
                    <Text style={styles.content}>
                        {this.state.bullet} Crowdfunding safety. 
                        Look for a site that is safe to use and it is encrypted.
                        
                    </Text>
                    <Text style={styles.content}>
                        Different crowdfunding.
                    </Text>
                    <Text style={styles.content}>
                        Reward-based crowdfunding 
                    </Text>
                    <Text style={styles.content}>
                    It is used to raise funds foe a new start-up, 
                    entrepreneurs seek financial backup to start their businesses 
                    and the funder gets a reward in return that is not money related.
                    </Text>
                    <Text style={styles.content}>
                        Equity crowdfunding
                    </Text>
                    <Text style={styles.content}>
                    Entrepreneurs who seek a certain amount of cash to launch their businesses. 
                    The funder receives a percentage ownership in the business.
                    </Text>
                    <Text style={styles.content}>
                        Donation-based crowdfunding
                    </Text>
                    <Text style={styles.content}>
                    It is when an individual asks for donations from many people for a project 
                    their working on it could be a personal or community-based project. 
                    You share your fundraiser online to convince people to donate.
                    </Text>

                </Card>
                <Card style={styles.card}>
                    <Text style={styles.title}> Taxes</Text>
                    <Text style={styles.content}>
                    Entrepreneurs who want to start a business need to be aware 
                    of the tax obligations of running a business whether it is in the 
                    form of a legal entity or in a personal capacity. 
                    It is also important to note the various options about reducing 
                    some of the administrative requirements to make tax compliance 
                    easier as well as the different tax incentives.
                    <Touch onPress={()=>Linking.openURL('https://www.sars.gov.za/businesses-and-employers/small-businesses/starting-a-business-and-tax/').catch(ee=> console.error('An Error Occurred', ee))}>
                    <Text style={styles.link}>Starting A Business and Tax.</Text>
                </Touch>
                
                    </Text>
                    <Text style={styles.content}>Tax Return</Text>
                    <Text style={styles.content}>
                    Turnover tax is a simplified system aimed at making it easier for micro business 
                    to meet their tax obligations. The turnover tax system replaces Income Tax, VAT, 
                    Provisional Tax, Capital Gains Tax and Dividends Tax for micro businesses 
                    with a qualifying annual turnover of R 1 million or less. 
                    A micro business that is registered for turnover tax can, however, 
                    elect to remain in the VAT system (from 1 March 2012).
                    <Touch onPress={()=>Linking.openURL('https://www.sars.gov.za/types-of-tax/turnover-tax/').catch(ee=> console.error('An Error Occurred', ee))}>
                        <Text style={styles.link}>Tax return.</Text>
                    </Touch>
                    </Text>
                </Card>
            </ScrollView>
        )
    }
}
export default FinanceScreen;

const styles = StyleSheet.create({
    link:{
        fontFamily:'georgia,serif',
        fontSize:15,
        fontWeight:'bold',
        color:'orange',
        paddingTop:10,
        paddingLeft:5,
       
    },
    contentB:{
        padding:5,
        marginLeft:25,
        fontFamily:'Georgia,serif',
        fontSize: 15
    },
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