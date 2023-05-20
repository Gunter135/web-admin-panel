package com.example.flowersadminpanel.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JWTTokenHelper {

    private static final String SECRET_KEY = "24432646294A404E635266556A576E5A7234753778214125442A472D4B615064";

    public String extractUsername(String token){
        return getClaim(token,Claims::getSubject);
    }

    private Claims getAllClaimsFromToken(String token) {
        Claims claims;
        try {
            claims = Jwts
                    .parserBuilder()
                    .setSigningKey(getSignInKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            claims = null;
        }
        return claims;
    }
    private Key getSignInKey(){
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY));
    }
    public <T> T getClaim(String token, Function<Claims,T> claimsResolver){
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }


    public String generateToken(UserDetails userDetails){
        return generateToken(new HashMap<>(), userDetails);
    }


    public String generateToken(Map<String,Object> extraClaims, UserDetails userDetails){

        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
                .signWith(getSignInKey(),SignatureAlgorithm.HS256)
                .compact();
    }

    public Boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (
                username.equals(userDetails.getUsername()) && !isTokenExpired(token)
        );
    }

    public Boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return getClaim(token, Claims::getExpiration);
    }


// this might be useful later on
//
//    @Value("${jwt.auth.app}")
//    private String appName;
//
//    @Value("${jwt.auth.secret_key}")
//    private String secretKey;
//
//    @Value("${jwt.auth.expires_in}")
//    private int expiresIn;
//
//    private final SignatureAlgorithm SIGNATURE_ALGORITHM = SignatureAlgorithm.HS256;
//
//
//
//    private Claims getAllClaimsFromToken(String token) {
//        Claims claims;
//        try {
//            SecretKey secret = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
//            claims = Jwts
//                    .parserBuilder()
//                    .setSigningKey(secret)
//                    .build()
//                    .parseClaimsJws(token)
//                    .getBody();
//        } catch (Exception e) {
//            claims = null;
//        }
//        return claims;
//    }
//
//
//    public String getUsernameFromToken(String token) {
//        String username;
//        try {
//            final Claims claims = this.getAllClaimsFromToken(token);
//            username = claims.getSubject();
//        } catch (Exception e) {
//            username = null;
//        }
//        return username;
//    }
//
//    public String generateToken(String username) throws InvalidKeySpecException, NoSuchAlgorithmException {
//
//        return Jwts.builder()
//                .setIssuer( appName )
//                .setSubject(username)
//                .setIssuedAt(new Date())
//                .setExpiration(generateExpirationDate())
//                .signWith( SIGNATURE_ALGORITHM, secretKey )
//                .compact();
//    }
//
//    private Date generateExpirationDate() {
//        return new Date(new Date().getTime() + expiresIn * 1000);
//    }
//
//    public Boolean validateToken(String token, UserDetails userDetails) {
//        final String username = getUsernameFromToken(token);
//        return (
//                username != null &&
//                        username.equals(userDetails.getUsername()) &&
//                        !isTokenExpired(token)
//        );
//    }
//
//    public boolean isTokenExpired(String token) {
//        Date expireDate=getExpirationDate(token);
//        return expireDate.before(new Date());
//    }
//
//
//    private Date getExpirationDate(String token) {
//        Date expireDate;
//        try {
//            final Claims claims = this.getAllClaimsFromToken(token);
//            expireDate = claims.getExpiration();
//        } catch (Exception e) {
//            expireDate = null;
//        }
//        return expireDate;
//    }
//
//
//    public Date getIssuedAtDateFromToken(String token) {
//        Date issueAt;
//        try {
//            final Claims claims = this.getAllClaimsFromToken(token);
//            issueAt = claims.getIssuedAt();
//        } catch (Exception e) {
//            issueAt = null;
//        }
//        return issueAt;
//    }
//
//    public String getToken( HttpServletRequest request ) {
//
//        String authHeader = getAuthHeaderFromHeader( request );
//        if ( authHeader != null && authHeader.startsWith("Bearer ")) {
//            return authHeader.substring(7);
//        }
//
//        return null;
//    }
//
//    public String getAuthHeaderFromHeader( HttpServletRequest request ) {
//        return request.getHeader("Authorization");
//    }
}
