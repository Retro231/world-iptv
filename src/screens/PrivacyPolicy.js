import {
  BackHandler,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../components/Header/Header';
import {useNavigation} from '@react-navigation/native';
import {globalColors, globalVariables} from '../global';

const PrivacyPolicy = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const backAction = () => {
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);
  const redirectToGmail = receiverEmail => {
    const gmailURL = `mailto:${receiverEmail}`;

    Linking.canOpenURL(gmailURL)
      .then(supported => {
        if (supported) {
          Linking.openURL(gmailURL);
        } else {
          // Fallback to web URL
          Linking.openURL(
            `https://mail.google.com/mail/?view=cm&fs=1&to=${receiverEmail}`,
          );
        }
      })
      .catch(err => console.error('An error occurred', err));
  };
  return (
    <>
      <Header goBackTo={'oneStep'} />
      <View style={styles.container}>
        <Text style={styles.title}>Privacy Policy: </Text>
        <ScrollView>
          <View style={styles.content}>
            <Text style={styles.contentText}>
              Privacy policy applies to the{' '}
              <Text style={{fontWeight: 'bold'}}>IPTV USA</Text> app (hereby
              referred to as "Application") for mobile devices that was created
              by (hereby referred to as "Service Provider") as a Free service.
              This service is intended for use "AS IS".
            </Text>
            <Text style={styles.contentTitle}>
              Information Collection and Use
            </Text>
            <Text style={styles.contentText}>
              The Application collects information when you download and use it.
              This information may include information such as:
            </Text>
            <Text style={[styles.contentText, {marginTop: -15}]}>
              Your device's Internet Protocol address (e.g. IP address),
            </Text>
            <Text style={[styles.contentText, {marginTop: -15}]}>
              The pages of the Application that you visit, the time and date of
              your visit, the time spent on those pages,
            </Text>
            <Text style={[styles.contentText, {marginTop: -15}]}>
              The time spent on the Application,
            </Text>
            <Text style={[styles.contentText, {marginTop: -15}]}>
              The operating system you use on your mobile device
            </Text>
            <Text style={styles.contentText}>
              The Application does not gather precise information about the
              location of your mobile device.
            </Text>
            <Text style={styles.contentText}>
              The Service Provider may use the information you provided to
              contact you from time to time to provide you with important
              information, required notices and marketing promotions.
            </Text>
            <Text style={styles.contentText}>
              For a better experience, while using the Application, the Service
              Provider may require you to provide us with certain personally
              identifiable information, including but not limited to Nothing.
              The information that the Service Provider request will be retained
              by them and used as described in this privacy policy.
            </Text>
            <Text style={styles.contentTitle}>Third Party Access </Text>
            <Text style={styles.contentText}>
              Only aggregated, anonymized data is periodically transmitted to
              external services to aid the Service Provider in improving the
              Application and their service. The Service Provider may share your
              information with third parties in the ways that are described in
              this privacy statement.
            </Text>

            <Text style={styles.contentText}>
              Please note that the Application utilizes third-party services
              that have their own Privacy Policy about handling data. Below are
              the links to the Privacy Policy of the third-party service
              providers used by the Application:
            </Text>

            <Text style={[styles.contentText, {marginTop: -15}]}>
              {'\u2022'} Google Play Services
            </Text>

            <Text style={[styles.contentText, {marginTop: -15}]}>
              {'\u2022'} Facebook
            </Text>

            <Text style={styles.contentText}>
              The Service Provider may disclose User Provided and Automatically
              Collected Information: as required by law, such as to comply with
              a subpoena, or similar legal process; when they believe in good
              faith that disclosure is necessary to protect their rights,
              protect your safety or the safety of others, investigate fraud, or
              respond to a government request; with their trusted services
              providers who work on their behalf, do not have an independent use
              of the information we disclose to them, and have agreed to adhere
              to the rules set forth in this privacy statement.
            </Text>
            <Text style={styles.contentTitle}>Opt-Out Rights</Text>
            <Text style={styles.contentText}>
              You can stop all collection of information by the Application
              easily by uninstalling it. You may use the standard uninstall
              processes as may be available as part of your mobile device or via
              the mobile application marketplace or network.
            </Text>
            <Text style={styles.contentTitle}>Data Retention Policy</Text>
            <Text style={styles.contentText}>
              The Service Provider will retain User Provided data for as long as
              you use the Application and for a reasonable time thereafter. If
              you'd like them to delete User Provided Data that you have
              provided via the Application, please contact them at{' '}
              <Text
                style={{color: 'blue', textDecorationLine: 'underline'}}
                onPress={() => redirectToGmail(globalVariables.Email)}>
                {`${globalVariables.Email}`}{' '}
              </Text>
              and they will respond in a reasonable time.
            </Text>
            <Text style={styles.contentTitle}>Children</Text>
            <Text style={styles.contentText}>
              The Service Provider does not use the Application to knowingly
              solicit data from or market to children under the age of 13.
            </Text>
            <Text style={styles.contentText}>
              The Application does not address anyone under the age of 13. The
              Service Provider does not knowingly collect personally
              identifiable information from children under 13 years of age. In
              the case the Service Provider discover that a child under 13 has
              provided personal information, the Service Provider will
              immediately delete this from their servers. If you are a parent or
              guardian and you are aware that your child has provided us with
              personal information, please contact the Service Provider (
              <Text
                style={{color: 'blue', textDecorationLine: 'underline'}}
                onPress={() => redirectToGmail(globalVariables.Email)}>
                {`${globalVariables.Email}`}
              </Text>
              ) so that they will be able to take the necessary actions.
            </Text>
            <Text style={styles.contentTitle}>Security</Text>
            <Text style={styles.contentText}>
              The Service Provider is concerned about safeguarding the
              confidentiality of your information. The Service Provider provides
              physical, electronic, and procedural safeguards to protect
              information the Service Provider processes and maintains.
            </Text>
            <Text style={styles.contentTitle}>Changes</Text>
            <Text style={styles.contentText}>
              This Privacy Policy may be updated from time to time for any
              reason. The Service Provider will notify you of any changes to the
              Privacy Policy by updating this page with the new Privacy Policy.
              You are advised to consult this Privacy Policy regularly for any
              changes, as continued use is deemed approval of all changes.
            </Text>
            <Text style={styles.contentText}>
              This privacy policy is effective as of 2024-05-17
            </Text>
            <Text style={styles.contentTitle}>Your Consent</Text>
            <Text style={styles.contentText}>
              By using the Application, you are consenting to the processing of
              your information as set forth in this Privacy Policy now and as
              amended by us.
            </Text>
            <Text style={styles.contentTitle}>Contact Us</Text>
            <Text style={styles.contentText}>
              If you have any questions regarding privacy while using the
              Application, or have questions about the practices, please contact
              the Service Provider via email at{' '}
              <Text
                style={{color: 'blue', textDecorationLine: 'underline'}}
                onPress={() => redirectToGmail(globalVariables.Email)}>
                {`${globalVariables.Email}`}
              </Text>
              .
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  title: {
    color: globalColors.primaryBackground,
    fontSize: 20,
    margin: 10,
    fontWeight: 'bold',
  },
  content: {
    gap: 10,
    marginBottom: 10,
  },
  contentTitle: {
    textAlign: 'justify',
    marginHorizontal: 10,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
    marginBottom: -12,
  },
  contentText: {
    textAlign: 'justify',
    marginHorizontal: 10,
    fontWeight: '400',
    color: 'black',
    fontSize: 14,
  },
});
