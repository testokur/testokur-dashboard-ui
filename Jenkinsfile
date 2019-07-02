pipeline {
	agent { label 'docker-slave' }

	options {
		disableConcurrentBuilds()
		timeout(time: 60, unit: 'MINUTES')
		buildDiscarder(logRotator(numToKeepStr: '20'))
	}
	parameters {
    choice(
      choices: ['QA' , 'PROD'],
      description: 'Environment?',
      name: 'Environment')
  }
	stages {
		stage('Clean') {
		  steps {
        cleanWs()
        sh "echo y | docker volume prune"
        sh "echo y | docker image prune"
        checkout scm
        sh "docker-compose down"
		  }
		}
		stage('Build&Test') {
			when {
        expression { params.Environment != 'PROD' }
      }
			steps{
				sh "docker-compose build app"
				sh "docker save -o dashboard.tar testokur-dashboard:latest"
			}
		}
		stage('Deploy to QA') {
			when {
        expression { params.Environment != 'PROD' }
      }
			steps{
				echo "Deploying to qa environment..."
				sh "scp dashboard.tar root@185.141.33.33:/home/docker-images/"
				sh "ssh root@185.141.33.33 'bash -s' < deploy.sh"
			}
		}
		stage('Deploy to PROD') {
			when {
        expression { params.Environment == 'PROD' }
      }
      steps {
        echo "Deploying to prod environment..."
        sh "ssh root@185.141.33.33 'bash -s' < deploy-prod.sh"
      }
		}
	}
	post {
      always {
        echo 'CI job execution finished'
      }
      success {
        echo 'CI job is successful'
      }
      failure {
        echo 'CI job has failed.'
        emailext body: 'testokur-dashboard CI job failed',
                  subject: "testokur-dashboard CI job failed",
                  to: "nazmialtun@windowslive.com"
      }
      changed {
        echo 'CI job is changed.'
        emailext body: 'testokur-dashboard CI job changed',
                  subject: "testokur-dashboard CI job changed",
                  to: "nazmialtun@windowslive.com"
      }
    }
}
