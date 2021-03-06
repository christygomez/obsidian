import { Rhum } from 'https://deno.land/x/rhum@v1.1.4/mod.ts';
import {
  destructureQueries,
  findQueryStrings,
  createQueriesObj,
  splitUpQueryStr,
  findQueryFields,
  findClosingBrace,
} from '../../src/destructure.js';
import { test } from '../test_variables/destructure_variables.ts';

Rhum.testPlan('destructure.ts', () => {
  Rhum.testSuite('destructure helper function tests', () => {
    Rhum.testCase('findQueryStrings test', () => {
      const results = findQueryStrings(test.findQueryStringsTestData);
      Rhum.asserts.assertEquals(test.findQueryStringsResultData, results);
    });
    Rhum.testCase('createQueriesObj test', () => {
      const results = createQueriesObj(
        test.createQueriesObjTestData,
        'queries'
      );
      console.log('RESULTS', results)
      Rhum.asserts.assertEquals(test.createQueriesObjResultsData, results);
    });
    Rhum.testCase('findQueryFields test', () => {
      console.log(test.findQueryFieldsTestData);
      const results = findQueryFields(test.findQueryFieldsTestData);
      console.log(results);
      Rhum.asserts.assertEquals(test.findQueryFieldsResultData, results);
    });
    Rhum.testCase('findClosingBrace test', () => {
      const results = findClosingBrace(test.findClosingBraceTestData, 62);
      Rhum.asserts.assertEquals(test.findClosingBraceResultData, results);
    });
  });

  Rhum.testSuite('destructure single query tests', () => {
    Rhum.testCase('destructure single query string - no inputs', () => {
      const result = destructureQueries(test.ALL_ACTORS);
      Rhum.asserts.assertEquals(test.allActorsTestResult, result);
    });
    Rhum.testCase('destructure single query string - inputs', () => {
      const result = destructureQueries(test.ALL_ACTION_MOVIES);
      Rhum.asserts.assertEquals(test.allActionTestResult, result);
    });
  });

  Rhum.testSuite('destructure multi query tests', () => {
    Rhum.testCase('destructure multi query - input / non input', () => {
      const result = destructureQueries(test.ALL_ACTION_MOVIES_AND_ALL_ACTORS);
      Rhum.asserts.assertEquals(test.allActionActorsTestResult, result);
    });
  });

  Rhum.testSuite('destructure alias query tests', () => {
    Rhum.testCase('destructure multi alias query - input / non input', () => {
      const result = destructureQueries(test.newAliasTestQuery);
      Rhum.asserts.assertEquals(test.newAliasTestResult, result);
    });
  });
  
  Rhum.testSuite('destructure fragment tests', () => {
    Rhum.testCase('destructure fragment tests - results in two seperate queries', () => {
      const result = destructureQueries(test.fragmentTestData);
      Rhum.asserts.assertEquals(test.fragmentResultData, result);
    });
    Rhum.testCase('destructure fragment tests - results in one query', () => {
      const result = destructureQueries(test.fragmentTestData2);   
      Rhum.asserts.assertEquals(test.fragmentResultData2, result);
    });
    Rhum.testCase('destructure fragment tests - nested fragments', () => {
      const result = destructureQueries(test.fragmentTestData3);
      Rhum.asserts.assertEquals(test.fragmentResultData3, result);
    });
  });
});

Rhum.run();
