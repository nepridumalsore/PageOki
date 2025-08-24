plugins {
	java
	id("org.springframework.boot") version "3.5.3"
	id("io.spring.dependency-management") version "1.1.7"
}

group = "com.example"
version = "0.0.1-SNAPSHOT"

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(21)
	}
}

repositories {
	mavenCentral()
}

dependencyManagement {
	imports {
		mavenBom("org.springframework.cloud:spring-cloud-dependencies:2023.0.1")
	}
}

dependencies {
	// Spring Cloud Gateway (основа)
	implementation("org.springframework.cloud:spring-cloud-starter-gateway")

	// WebFlux
	implementation("org.springframework.boot:spring-boot-starter-webflux")

	// Spring Security
	implementation("org.springframework.boot:spring-boot-starter-security")

	// JWT
	implementation("io.jsonwebtoken:jjwt-api:0.11.5")
	runtimeOnly("io.jsonwebtoken:jjwt-impl:0.11.5")
	runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.11.5")

	// OpenAPI UI (опционально)
	implementation("org.springdoc:springdoc-openapi-starter-webflux-ui:2.3.0")

	// Redis (если будешь кешировать токены или использовать rate limiting)
	implementation("org.springframework.boot:spring-boot-starter-data-redis")

	// Actuator для метрик
	implementation("org.springframework.boot:spring-boot-starter-actuator")

	// Lombok
	compileOnly("org.projectlombok:lombok:1.18.36")
	annotationProcessor("org.projectlombok:lombok:1.18.36")

	// Тестирование
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.springframework.security:spring-security-test")
}

tasks.withType<Test> {
	useJUnitPlatform()
}
